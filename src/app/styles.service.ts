import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StylesService {

  API_URL = '/api/compile/scss';
  mapSassToCss = new Map<string, string>();

  colors: Array<any> = [
    {label: 'Primary', name: 'primary', value: ''},
    {label: 'Secondary', name: 'secondary', value: ''},
    {label: 'Surface', name: 'surface', value: ''},
    {label: 'Error', name: 'error', value: ''},
    {label: 'On Primary', name: 'on-primary', value: ''},
    {label: 'On Secondary', name: 'on-secondary', value: ''},
    {label: 'On Surface', name: 'on-surface', value: ''},
    {label: 'On Error', name: 'on-error', value: ''},
  ];

  shapes: Array<any> = [
    {label: 'Large', name: '$mdc-shape-large-component-radius', value: '0', defaultValue: '0'},
    {label: 'Medium', name: '$mdc-shape-medium-component-radius', value: '8', defaultValue: '8'},
    {label: 'Small', name: '$mdc-shape-small-component-radius', value: '4', defaultValue: '4'},
  ];

  colorSubject: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  shapeSubject: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(private httpClient: HttpClient) {}

  getColors(): Array<any> {
    return this.colors;
  }

  getColorSubject(): Observable<Array<any>> {
    return this.colorSubject.asObservable();
  }

  setColors(colors: Array<any>): void {
    this.colors = colors;
    this.colorSubject.next(this.colors);
  }

  getShape(): Array<any> {
    return this.shapes;
  }

  getShapeSubject(): Observable<Array<any>> {
    return this.shapeSubject.asObservable();
  }

  setShape(shapes: Array<any>): void {
    this.shapes = shapes;
    this.shapeSubject.next(this.shapes);
  }

  compileGlobalStyles(elementId: string): void {
    const scss = this.compileScss();
    if (!this.mapSassToCss.has(scss)) {
      this.httpClient.post(this.API_URL, {data: {code: scss}}).subscribe((response) => {
        const previousScript = document.getElementById(elementId);
        const data = response['data'];

        if (previousScript) {
          previousScript.parentElement.removeChild(previousScript);
        }

        if (data) {
          let ss = document.getElementsByTagName('head')[0].innerHTML;
          ss += `<style type="text/css" id="${elementId}">${data.replace(':root', '')}</script>`;
          document.getElementsByTagName('head')[0].innerHTML = ss;
          this.mapSassToCss.set(scss, data);
        }
      });
    } else {
      const previousScript = document.getElementById(elementId);
      const data = this.mapSassToCss.get(scss);

      if (previousScript) {
        previousScript.parentElement.removeChild(previousScript);
      }

      if (data) {
        let ss = document.getElementsByTagName('head')[0].innerHTML;
        ss += `<style type="text/css" id="${elementId}">${data.replace(':root', '')}</script>`;
        document.getElementsByTagName('head')[0].innerHTML = ss;
      }
    }
  }

  compileLocalStyles(scss): Observable<string> {
    return this.httpClient
      .post(this.API_URL, {data: {code: scss}})
      .pipe(map((res: Response) => {
        const data = res['data'];
        if (data) {
          return data.replace(':root', '');
        } else {
          return '';
        }
      }));
  }

  private compileScss(): string {
    let scss = '.compiled-styles {\n';

    this.colors.forEach(el => {
      if (el.value !== '') {
        scss = `${scss}\n$mdc-theme-${el.name}: ${el.value};`;
      }
    });

    this.shapes.forEach(el => {
      if (el.value !== '' && el.value !== el.defaultValue) {
        scss = ` ${scss}\n${el.name}: ${el.value}${el.value > 0 ? 'px' : ''};`;
      }
    });

    scss = `${scss}
      @import "@material/theme/mdc-theme";
      @import "@material/textfield/mdc-text-field";
      @import "@material/list/mdc-list.scss";
      @import "@material/drawer/mdc-drawer";
      @import "@material/top-app-bar/mdc-top-app-bar";
      @import "@material/slider/mdc-slider";
      @import "@material/checkbox/mdc-checkbox";
      @import "@material/switch/mdc-switch";
      @import "@material/radio/mdc-radio";
      @import "@material/button/mdc-button";
      @import "@material/fab/mdc-fab";
      @import "@material/icon-button/mdc-icon-button";
    }
    `;
    return scss;
  }
}
