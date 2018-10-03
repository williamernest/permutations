import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCMenuSurface} from '@material/menu-surface';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {StylesService} from '../styles.service';

@Component({
  selector: 'app-color-changer',
  templateUrl: './color-changer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./color-changer.component.scss']
})
export class ColorChangerComponent implements OnInit, AfterViewInit, OnDestroy{

  colors: Array<any> = [];

  colorObject: Array<any> = [];

  @Output() cssChange: EventEmitter<string> = new EventEmitter<string>();
  menuSurface: MDCMenuSurface;
  httpRequestDebouncer = new Subject();

  constructor(private httpClient: HttpClient, private ele: ElementRef, private router: Router, private stylesService: StylesService) {
    this.httpRequestDebouncer.subscribe(() => {
      this.stylesService.compileGlobalStyles('demo-global-colors');
    });

    this.colors = this.stylesService.getColors();
  }

  ngOnInit() {
    this.colors.forEach(val => {
      if (val.value === '') {
        val.value = window.getComputedStyle(document.body).getPropertyValue(`--mdc-theme-${val.name}`);
        val.defaultValue = val.value;
      }
    });
  }

  updateColors() {
    this.stylesService.setColors(this.colors);
    this.httpRequestDebouncer.next();
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
