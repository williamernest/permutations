import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCMenuSurface} from '@material/menu-surface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-color-changer',
  templateUrl: './color-changer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./color-changer.component.scss']
})
export class ColorChangerComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() colors: Array<any> = [
    {label: 'Primary', name: 'primary', value: ''},
    {label: 'Secondary', name: 'secondary', value: ''},
    {label: 'Surface', name: 'surface', value: ''},
    {label: 'On Primary', name: 'on-primary', value: ''},
    {label: 'On Secondary', name: 'on-secondary', value: ''},
    {label: 'On Surface', name: 'on-surface', value: ''},
    ];
  @Output() cssChange: EventEmitter<string> = new EventEmitter<string>();
  menuSurface: MDCMenuSurface;

  constructor(private httpClient: HttpClient, private ele: ElementRef) { }

  ngOnInit() {
    this.colors.forEach(val => {
      val.value = window.getComputedStyle(document.body).getPropertyValue(`--mdc-theme-${val.name}`);
    });
  }

  buildSass() {
    let data = '';
    this.colors.forEach(el => data = `${data}\n$mdc-theme-${el.name}: ${el.value};`);

    data = `${data}\n@import "@material/textfield/mdc-text-field.scss";`;
    return this.colors[0].value ? data : '';
  }

  updateColors() {
    this.httpClient.post('/api/compile/scss', {data: {code: this.buildSass()}}).subscribe((response) => {
      const ele = document.getElementById('demo-class');

      if (ele) {
        ele.parentElement.removeChild(ele);
      }

      if (response['data']) {
        let ss = document.getElementsByTagName('head')[0].innerHTML;
        ss += `<style type="text/css" id="demo-class">${response['data']}</script>`;
        document.getElementsByTagName('head')[0].innerHTML = ss;
      }
      // this.cssChange.emit(response['data']);
    });
  }

  ngAfterViewInit(): void {
    this.menuSurface = new MDCMenuSurface(this.ele.nativeElement.querySelector('.mdc-menu-surface'));
    const anchorElement = this.ele.nativeElement.querySelector('.mdc-menu-surface--anchor');

    this.menuSurface.setMenuSurfaceAnchorElement(anchorElement);
    this.menuSurface.hoistMenuToBody();
  }

  toggle() {
    if (this.menuSurface) {
      this.menuSurface.open = !this.menuSurface.open;
    }
  }

  ngOnDestroy(): void {
    if (this.menuSurface) {
      this.menuSurface.destroy();
    }
  }

}
