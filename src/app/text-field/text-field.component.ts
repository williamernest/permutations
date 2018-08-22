import {Component, ElementRef, OnInit, OnDestroy, ViewEncapsulation, Input, AfterViewInit} from '@angular/core';
import {MDCTextField} from '@material/textfield';
import * as shortId from 'shortid';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, OnDestroy, AfterViewInit {

  public States = TextfieldStates;
  public Types = TextfieldType;
  public Parameters = TextfieldParameters;
  public HelperTextStyle = TextfieldHelperTextStyles;

  private textField: MDCTextField;
  currentClassesTf: Object = {};
  currentClassesLabel: Object = {};
  currentClassesLineRipple: Object = {};
  currentClassesOutline: Object = {};
  currentClassesHelperText: Object = {};
  hasLineRipple = true;
  hasOutline = false;
  componentId: string;

  @Input() helperText = 'Helper Text';
  @Input() value = '';
  @Input() label = 'Floating Label';
  @Input() leadingIcon: string;
  @Input() trailingIcon: string;
  @Input() dense = false;
  @Input() type = TextfieldType.Default;
  @Input() state = TextfieldStates.Default;
  @Input() parameters: TextfieldParameters = TextfieldParameters.NoIcon;
  @Input() helperTextParams: TextfieldHelperTextStyles;

  constructor(private myElement: ElementRef) {
    this.componentId = shortId.generate();
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.setIndicator();

    // Quick hack to force the outline text field to render the outline correctly in focused state with no value.
    if (this.state === this.States.FocusedInvalid || this.state === this.States.Focused) {
      if (this.value === '') {
        this.value = ' ';
      }
    }
  }

  ngAfterViewInit() {
    this.textField = new MDCTextField(this.myElement.nativeElement.firstChild);
  }

  ngOnDestroy() {
    if (this.textField) {
      this.textField.destroy();
    }
  }

  /**
   * Initial setup of classes for all elements of the text field.
   */
  setCurrentClasses(): void {
    this.currentClassesTf = {
      'mdc-text-field--box': this.type === this.Types.Default,
      'mdc-text-field--outlined': this.type === this.Types.Outlined,
      'mdc-text-field--textarea': this.type === this.Types.Textarea || this.type === this.Types.FullwidthTextArea,
      'mdc-text-field--fullwidth': this.type === this.Types.Fullwidth || this.type === this.Types.FullwidthTextArea,
      'mdc-text-field--focused': this.state === this.States.FocusedInvalid || this.state === this.States.Focused,
      'mdc-text-field--invalid': this.state === this.States.Invalid || this.state === this.States.FocusedInvalid,
      'mdc-text-field--disabled': this.state === this.States.Disabled,
      'mdc-text-field--with-leading-icon': this.parameters === this.Parameters.LeadingIcon || this.parameters === this.Parameters.BothIcons,
      'mdc-text-field--with-trailing-icon': this.parameters === this.Parameters.TrailingIcon
      || this.parameters === this.Parameters.BothIcons,
      'mdc-text-field--dense': this.dense,
      // '__hover': this.state === this.States.Hovered,
    };

    this.currentClassesLabel = {
      'mdc-floating-label--float-above': this.state === this.States.Focused || this.state === this.States.FocusedInvalid,
    };

    this.currentClassesOutline = {
      'mdc-notched-outline--notched': this.state === this.States.Focused || this.state === this.States.FocusedInvalid,
    };

    this.currentClassesLineRipple = {
      'mdc-line-ripple--active': this.state === this.States.Focused || this.state === this.States.FocusedInvalid,
    };

    this.currentClassesHelperText = {
      'mdc-text-field-helper-text--persistent':
        this.helperTextParams === this.HelperTextStyle.PersistentHelperText ||
        this.helperTextParams === this.HelperTextStyle.PersistentValidationMsg,
      'mdc-text-field-helper-text--validation-msg':
        this.helperTextParams === this.HelperTextStyle.PersistentValidationMsg ||
        this.helperTextParams === this.HelperTextStyle.ValidationMsg
    };

    if (this.state === this.States.Focused || this.state === this.States.FocusedInvalid) {
      if (this.type !== this.Types.Fullwidth) {
        this.value = ' ';
      }
    }

  }

  /**
   * Sets the line ripple or the svg outline element properties to render.
   */
  setIndicator(): void {
    if (this.type === this.Types.Default || this.type === this.Types.Fullwidth) {
      this.hasLineRipple = true;
      this.hasOutline = false;
    } else if (this.type === this.Types.Outlined) {
      this.hasLineRipple = false;
      this.hasOutline = true;
    } else {
      this.hasLineRipple = false;
      this.hasOutline = false;
    }
  }

}
