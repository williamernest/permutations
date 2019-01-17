import {AfterContentChecked, Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MDCRipple} from '@material/ripple';
import {ButtonState, ButtonType} from '../../button-config';
import {NgStyle} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnDestroy, OnInit, AfterContentChecked, OnChanges {

  @Input() text: string;
  @Input() icon = '';
  @Input() state: string;
  @Input() type: ButtonType = ButtonType.Default;
  @Input() dense = false;
  @Input() styleOverride: NgStyle | string;

  @HostBinding('attr.style')
  public get primaryAsStyle(): any {
    if (!this.styleOverride || !this.styleOverride['--mdc-theme-primary']) {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustStyle(`--mdc-theme-primary: ${this.styleOverride['--mdc-theme-primary']}`);
  }

  private resetComponent = false;

  public Types = ButtonType;

  ripple_: MDCRipple;
  isDisabled_ = false;
  currentClasses_ = {};

  constructor(private myElement: ElementRef, private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'type':
          case 'state':
          case 'icon':
            this.resetComponent = true;
            break;
        }
      }
    }
  }

  ngAfterContentChecked() {
    if (this.resetComponent) {
      this.setCurrentClasses();
      this.isDisabled_ = this.state === ButtonState[ButtonState.Disabled];
      if (this.ripple_) {
        this.ripple_.destroy();
      }
      this.ripple_ = new MDCRipple(this.myElement.nativeElement.firstChild);
      this.resetComponent = false;
    }
  }

  ngOnInit() {
    this.setCurrentClasses();
  }

  ngOnDestroy(): void {
    if (this.ripple_) {
      this.ripple_.destroy();
    }
  }

  setCurrentClasses() {
    this.currentClasses_ = {
      'mdc-button--dense': this.dense,
    };

    this.currentClasses_[this.Types[this.type]] = (this.type !== null);
  }
}
