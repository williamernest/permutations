import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StylesService} from '../styles.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sasscode',
  templateUrl: './sasscode.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sasscode.component.scss']
})
export class SasscodeComponent implements OnInit {

  @Input() currentComponent_ = 'textfield';
  scss = '';
  colorObservable: Observable<Array<any>>;

  constructor(private styleService: StylesService, private changeDetector: ChangeDetectorRef) {
    this.buildSass();
  }

  ngOnInit() {
    this.colorObservable = this.styleService.getColorSubject();
    this.colorObservable.subscribe(() => {
      this.buildSass();
    });
  }

  @Input()
  set currentComponent(component) {
    if (component && this.currentComponent_ !== component) {
      this.currentComponent_ = component;
      this.buildSass();
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

    setTimeout(() => this.scss = data, 0);
  }

}
