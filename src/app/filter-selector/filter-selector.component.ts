import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';
import * as shortId from 'shortid';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit {

  checkbox: MDCCheckbox;
  formField: MDCFormField;
  componentId: string;
  @Input() label;
  @Output() checkboxChange = new EventEmitter<boolean>();

  constructor(private myElement: ElementRef) {
    this.componentId = shortId.generate();
  }

  ngOnInit() {
    this.checkbox = new MDCCheckbox(this.myElement.nativeElement.querySelector('.mdc-checkbox'));
    this.formField = new MDCFormField(this.myElement.nativeElement.querySelector('.mdc-form-field'));
    this.formField.input = this.checkbox;
  }

  changed() {
    this.checkboxChange.emit(this.checkbox.checked);
  }

}
