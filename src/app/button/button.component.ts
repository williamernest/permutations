import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCRipple} from '@material/ripple';
import {ButtonState, ButtonType} from '../button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() state: string;
  @Input() type: ButtonType = ButtonType.Default;
  @Input() dense = false;

  public Types = ButtonType;

  ripple_: MDCRipple;
  isDisabled_ = false;
  currentClasses_ = {};

  constructor(private myElement: ElementRef) {
  }

  ngOnInit() {
    this.isDisabled_ = this.state === ButtonState[ButtonState.Disabled];
    this.setCurrentClasses();
  }

  ngAfterViewInit(): void {
    this.ripple_ = new MDCRipple(this.myElement.nativeElement.firstChild);
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
