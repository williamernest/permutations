import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';
import pretty from 'pretty';
import {TextfieldGenerator} from '../generators/textfield-generator';

@Component({
  selector: 'app-sandbox-hero',
  templateUrl: './sandbox-hero.component.html',
  styleUrls: ['./sandbox-hero.component.scss']
})
export class SandboxHeroComponent implements OnInit, AfterViewChecked {

  floatingLabel = 'Floating Label';
  value: string = null;
  leadingIcon = '';
  trailingIcon = '';
  params: TextfieldParameters|string = TextfieldParameters.NoIcon;
  type: TextfieldType|string = TextfieldType.Default;
  state: TextfieldStates|string = TextfieldStates.Default;
  dense = false;

  html: HTMLElement;
  html_: string;
  jsx_: string;
  android_: string;
  webComponents_: string;
  private refresh = false;
  private currentTab = 0;
  generator = new TextfieldGenerator();

  private selectors = [
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
      if (this.currentTab === 1) {
        this.html = this.myElement.nativeElement.querySelector('.mdc-text-field').parentElement;
        this.setRenderedHTML(this.html);
      } else if (this.currentTab === 2) {
        this.setRenderedJSX();
      } else if (this.currentTab === 3) {
        this.setRenderedAndroid();
      } else if (this.currentTab === 4) {
        this.setRenderedWebComponents();
      }
    }
  }

  @Input()
  set config(config) {
    for (const conf in config) {
      if (config.hasOwnProperty(conf)) {
        for (const key in config[conf]) {
          if (config[conf].hasOwnProperty(key)) {
            const change = config[conf];
            if (key === 'type') {
              this.type = TextfieldType[change[key]];
              this.refresh = true;
            } else if (key === 'state') {
              this.state = TextfieldStates[change[key]];
              this.refresh = true;
            } else if (key === 'leadingIcon') {
              this.leadingIcon = change[key];
              this.refresh = true;
            } else if (key === 'trailingIcon') {
              this.trailingIcon = change[key];
              this.refresh = true;
            } else if (key === 'floatingLabel') {
              this.floatingLabel = change[key];
              this.refresh = true;
            }
          }
        }
      }
    }
    this.reSync();
  }

  private reSync() {
    if (this.leadingIcon !== '' && this.trailingIcon !== '') {
      this.params = TextfieldParameters.BothIcons;
    } else if (this.leadingIcon !== '') {
      this.params = TextfieldParameters.LeadingIcon;
    } else if (this.trailingIcon !== '') {
      this.params = TextfieldParameters.TrailingIcon;
    } else {
      this.params = TextfieldParameters.NoIcon;
    }
  }

  set selectedTabChange(tab) {
    this.refresh = true;

    this.currentTab = tab.index;
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
      Array.from(element.querySelectorAll(this.selectors.join(', '))).forEach((ele) => {
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
      this.changeDetector.detectChanges();
    }
  }

  setRenderedJSX() {
    const jsx = this.generator.getJSX(this.floatingLabel, this.type, this.state, this.leadingIcon, this.trailingIcon, this.dense, '');
    this.jsx_ = pretty(jsx, {ocd: true}).toString();
    this.changeDetector.detectChanges();
  }

  setRenderedWebComponents() {
    const webComponents = this.generator.getWebComponents(this.floatingLabel,
      this.type, this.state, this.leadingIcon, this.trailingIcon, this.dense, '');
    this.webComponents_ = pretty(webComponents, {ocd: true}).toString();
    this.changeDetector.detectChanges();
  }

  setRenderedAndroid() {
    const android = this.generator.getAndroid(this.floatingLabel,
      this.type, this.state, this.leadingIcon, this.trailingIcon, this.dense, '');
    this.android_ = android;
    this.changeDetector.detectChanges();
  }

}
