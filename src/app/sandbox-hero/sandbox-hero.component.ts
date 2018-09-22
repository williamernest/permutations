import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';
import pretty from 'pretty';

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
  private refresh = false;
  private currentTab = 0;

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
    if (this.refresh && this.currentTab === 1) {
      this.html = this.myElement.nativeElement.querySelector('.mdc-text-field').parentElement;
      this.setRenderedHTML(this.html);
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
    if (tab.index === 1) {
      this.html = this.myElement.nativeElement.querySelector('.mdc-text-field').parentElement;
      this.refresh = true;
    }
    this.currentTab = tab.index;
  }

  get renderedHTML(): string {
    return this.html_ ? this.html_ : '';
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

}
