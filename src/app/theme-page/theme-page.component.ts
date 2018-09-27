import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCSlider} from '@material/slider';
import {MDCSwitch} from '@material/switch';
import {MDCRadio} from '@material/radio';
import {MDCCheckbox} from '@material/checkbox';
import {MDCDrawer} from '@material/drawer';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit, AfterViewInit, OnDestroy {

  destroyableElements: Array<MDCRipple> = [];
  constructor(private myElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.destroyableElements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-button, .mdc-fab, .mdc-icon-button, .mdc-slider, .mdc-switch, .mdc-top-app-bar, .mdc-text-field, .mdc-radio, .mdc-checkbox, .mdc-drawer')).map((ele: HTMLElement) => {
      if (ele.classList.contains('mdc-text-field')) {
        return new MDCTextField(ele);
      } else if (ele.classList.contains('mdc-radio')) {
        return new MDCRadio(ele);
      } else if (ele.classList.contains('mdc-checkbox')) {
        return new MDCCheckbox(ele);
      } else if (ele.classList.contains('mdc-top-app-bar')) {
        return new MDCTopAppBar(ele);
      } else if (ele.classList.contains('mdc-slider')) {
        return new MDCSlider(ele);
      } else if (ele.classList.contains('mdc-drawer')) {
        return new MDCDrawer(ele);
      } else if (ele.classList.contains('mdc-switch')) {
        return new MDCSwitch(ele);
      } else {
        return new MDCRipple(ele);
      }
    });

  }

  ngOnDestroy() {
    this.destroyableElements.forEach((ripple) => ripple.destroy());
  }

}
