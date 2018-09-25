import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';
import pretty from 'pretty';
import {TextfieldGenerator} from '../generators/textfield-generator';
import {ButtonGenerator} from '../generators/button-generator';

@Component({
  selector: 'app-sandbox-hero',
  templateUrl: './sandbox-hero.component.html',
  styleUrls: ['./sandbox-hero.component.scss']
})
export class SandboxHeroComponent implements OnInit, AfterViewChecked {

  currentComponent_ = 'textfield';
  config_: any = {
  };

  html: HTMLElement;
  html_: string;
  jsx_: string;
  android_: string;
  webComponents_: string;
  private refresh = false;
  private currentTab = 0;
  generator: any = new TextfieldGenerator();

  private selectorsToRemove = [
    '[ng-reflect-klass]',
    '[ng-reflect-ng-class]',
    '.ng-star-inserted',
    '.mdc-ripple-upgraded',
    '[d]',
    '[style]',
    '.mdc-line-ripple--deactivating',
    '.mdc-line-ripple--active'];

  constructor(private myElement: ElementRef, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.refresh) {
      this.refresh = false;
      if (this.currentTab === 1) {
        let currentComponentSelector = '.mdc-text-field';
        if (this.currentComponent === 'button') {
          currentComponentSelector = '.mdc-button';
        }

        this.html = this.myElement.nativeElement.querySelector(currentComponentSelector).parentElement;
        setTimeout(() => this.setRenderedHTML(this.html), 0);
      } else if (this.currentTab === 2) {
        this.setRenderedJSX();
      } else if (this.currentTab === 3) {
        this.setRenderedAndroid();
      } else if (this.currentTab === 4) {
        this.setRenderedWebComponents();
      }
      this.changeDetector.detectChanges();
    }
  }

  @Input()
  set config(config) {
    if (config) {
      this.runConfig(config);
    }
  }

  runConfig(config) {
    for (const conf in config) {
      if (config.hasOwnProperty(conf)) {
        for (const key in config[conf]) {
          if (config[conf].hasOwnProperty(key)) {
            const change = config[conf];
            if (key === 'type') {
              if (this.currentComponent === 'textfield') {
                this.config_.type = TextfieldType[change[key]];
              } else if (this.currentComponent === 'button') {
                this.config_.type = change[key];
              }
              this.refresh = true;
            } else if (key === 'state') {
              if (this.currentComponent === 'textfield') {
                this.config_.state = TextfieldStates[change[key]];
              } else if (this.currentComponent === 'button') {
                this.config_.state = change[key];
              }
              this.refresh = true;
            } else {
              this.config_[key] = change[key];
              this.refresh = true;
            }
          }
        }
      }
    }
    this.reSync();
  }

  private reSync() {
    if (this.config_.leadingIcon !== '' && this.config_.trailingIcon !== '') {
      this.config_.params = TextfieldParameters.BothIcons;
    } else if (this.config_.leadingIcon !== '') {
      this.config_.params = TextfieldParameters.LeadingIcon;
    } else if (this.config_.trailingIcon !== '') {
      this.config_.params = TextfieldParameters.TrailingIcon;
    } else {
      this.config_.params = TextfieldParameters.NoIcon;
    }
  }

  set selectedTabChange(tab) {
    this.refresh = true;

    this.currentTab = tab.index;
  }

  @Input()
  set currentComponent(component) {
    if (component && this.currentComponent_ !== component) {
      this.currentComponent_ = component;
      if (component === 'textfield') {
        this.generator = new TextfieldGenerator();
      } else if (component === 'button') {
        this.generator = new ButtonGenerator();
      }

      this.refresh = true;
    }
  }

  get currentComponent() {
    return this.currentComponent_;
  }

  get renderedHTML(): string {
    return this.html_ ? this.html_ : '';
  }
  get renderedJSX(): string {
    return this.jsx_ ? this.jsx_ : '';
  }
  get renderedAndroid(): string {
    return this.android_ ? this.android_ : '';
  }
  get renderedWebComponents(): string {
    return this.webComponents_ ? this.webComponents_ : '';
  }

  setRenderedHTML(element: HTMLElement)  {
    if (element) {
      Array.from(element.querySelectorAll(this.selectorsToRemove.join(', '))).forEach((ele) => {
        ele.removeAttribute('ng-reflect-klass');
        ele.removeAttribute('ng-reflect-ng-class');
        ele.removeAttribute('d');
        ele.classList.remove('ng-star-inserted');
        ele.classList.remove('mdc-ripple-upgraded');
        ele.classList.remove('mdc-line-ripple--deactivating');
        ele.classList.remove('mdc-line-ripple--active');
        ele.removeAttribute('style');
      });
      this.html_ = pretty(element.innerHTML.replace(/<!--[\s\S]*?-->/g, '\n'), {ocd: true}).toString();
    }
  }

  setRenderedJSX() {
    const jsx = this.generator.getJSX(this.config_);
    this.jsx_ = pretty(jsx, {ocd: true}).toString();
  }

  setRenderedWebComponents() {
    const webComponents = this.generator.getWebComponents(this.config_);
    this.webComponents_ = pretty(webComponents, {ocd: true}).toString();
  }

  setRenderedAndroid() {
    const android = this.generator.getAndroid(this.config_);
    this.android_ = android;
  }

}
