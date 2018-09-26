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

  colorSubject: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);

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

  compileGlobalStyles(scss: string, elementId: string): void {
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

  compileLocalStyles(scss: string): Observable<string> {
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
}
