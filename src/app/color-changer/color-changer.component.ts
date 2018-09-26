import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCMenuSurface} from '@material/menu-surface';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  @Output() cssChange: EventEmitter<string> = new EventEmitter<string>();
  menuSurface: MDCMenuSurface;
  httpRequestDebouncer = new Subject();

  constructor(private httpClient: HttpClient, private ele: ElementRef, private router: Router, private stylesService: StylesService) {
    this.httpRequestDebouncer.pipe(debounceTime(1000)).subscribe(() => {
      this.stylesService.compileGlobalStyles(this.buildSass(), 'demo-global-colors');
    });

    this.colors = this.stylesService.getColors()
  }

  ngOnInit() {
    this.colors.forEach(val => {
      if (val.value === '') {
        val.value = window.getComputedStyle(document.body).getPropertyValue(`--mdc-theme-${val.name}`);
      }
    });
  }

  buildSass() {
    let data;
    if (this.router.url === '/sandbox') { // TODO: Fixme
      data = '.hero {';
    } else {
      data = '.main-content {';
    }

    this.colors.forEach(el => {
      if (el.value !== '') {
        data = `${data}\n$mdc-theme-${el.name}: ${el.value};`;
      }
    });

    data = `${data}
      @import "@material/theme/mdc-theme.scss";
      @import "@material/textfield/mdc-text-field.scss";
    }
    `;
    this.stylesService.setColors(this.colors);
    return this.colors[0].value ? data : '';
  }

  updateColors() {
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
