import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCFormField} from '@material/form-field';
import {MDCRadio} from '@material/radio';
import * as shortId from 'shortid';

@Component({
  selector: 'app-radio-selector',
  templateUrl: './radio-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./radio-selector.component.scss']
})
export class RadioSelectorComponent implements OnInit {

  radio: MDCRadio;
  formField: MDCFormField;
  componentId: string;
  @Input() checked = false;
  @Input() label;
  @Input() radioName: string;
  @Output() radioChange = new EventEmitter<boolean>();

  constructor(private myElement: ElementRef) {
    this.componentId = shortId.generate();
  }

  ngOnInit() {
    this.radio = new MDCRadio(this.myElement.nativeElement.querySelector('.mdc-radio'));
    this.formField = new MDCFormField(this.myElement.nativeElement.querySelector('.mdc-form-field'));
    this.formField.input = this.radio;
  }

  changed() {
    this.checked = this.radio.checked;
    this.radioChange.emit(this.radio.checked);
  }

}
