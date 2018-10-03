import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCSlider} from '@material/slider';
import {MDCSwitch} from '@material/switch';
import {MDCRadio} from '@material/radio';
import {MDCCheckbox} from '@material/checkbox';
import {MDCDrawer} from '@material/drawer';
import {MDCIconButtonToggle} from '@material/icon-button';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit, AfterViewInit, OnDestroy {

  destroyableElements: Array<MDCRipple> = [];
  elementsToInit = [
    '.mdc-button',
    '.mdc-fab',
    '.mdc-icon-button',
    '.mdc-slider',
    '.mdc-switch',
    '.mdc-top-app-bar:not(.has-drawer)',
    '.mdc-text-field',
    '.mdc-radio',
    '.mdc-checkbox',
    '.mdc-drawer:not(.has-top-app-bar)',
  ];
  constructor(private myElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.destroyableElements = Array.from(this.myElement.nativeElement.querySelectorAll(this.elementsToInit.join((','))))
      .map((ele: HTMLElement) => {
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
        } else if (ele.classList.contains('mdc-icon-button')) {
          return new MDCIconButtonToggle(ele);
        } else {
          return new MDCRipple(ele);
        }
      });

    const topAppBarWithDrawer = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar.has-drawer'));
    const drawerWithTopAppBar = new MDCDrawer(document.querySelector('.mdc-drawer.has-top-app-bar'));
    topAppBarWithDrawer.listen('MDCTopAppBar:nav', () => drawerWithTopAppBar.open = !drawerWithTopAppBar.open);
    this.destroyableElements.push(topAppBarWithDrawer, drawerWithTopAppBar);

  }

  ngOnDestroy() {
    this.destroyableElements.forEach((ripple) => ripple.destroy());
  }

}
