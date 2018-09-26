import {AfterViewChecked, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StylesService} from '../styles.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-css-code',
  templateUrl: './css-code.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./css-code.component.scss']
})
export class CssCodeComponent implements OnInit, AfterViewChecked {

  @Input() currentComponent_ = 'textfield';
  css = '';
  refresh = false;
  colorObservable: Observable<Array<any>>;

  constructor(private styleService: StylesService) { }

  ngOnInit() {
    this.colorObservable = this.styleService.getColorSubject();
    this.colorObservable.subscribe((data) => {
      this.buildSass();
    });

  }

  ngAfterViewChecked() {
    if (this.refresh) {
      this.refresh = false;
      this.buildSass();
    }
  }

  @Input()
  set currentComponent(component) {
    if (component && this.currentComponent_ !== component) {
      this.currentComponent_ = component;
      this.refresh = true;
    }
  }

  buildSass() {
    let data = '';

    const colors = this.styleService.getColors();

    colors.forEach(el => {
      if (el.value !== '') {
        data = `${data}\n$mdc-theme-${el.name}: ${el.value};`;
      }
    });

    if (this.currentComponent_ === 'textfield') {
      data = `${data}\n@import "@material/textfield/mdc-text-field.scss";`;
    } else if (this.currentComponent_ === 'button') {
      data = `${data}\n@import "@material/button/mdc-button.scss";`;
    }

    this.styleService.compileLocalStyles(data).subscribe((res) => {
      this.css = res;
    });
  }

}
