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
  componentId: string;
  label_ = '';
  @Input() checked = false;
  @Input() input = false;
  @Output() checkboxChange = new EventEmitter<boolean>();
  @Output() labelChange = new EventEmitter<string>();

  constructor(private myElement: ElementRef) {
    this.componentId = shortId.generate();
  }

  ngOnInit() {
    this.checkbox = new MDCCheckbox(this.myElement.nativeElement.querySelector('.mdc-checkbox'));
  }

  @Input()
  get label() {
    return this.label_;
  }

  set label(val) {
    this.label_ = val;
    this.labelChange.emit(this.label_);
  }

  changed() {
    this.checked = this.checkbox.checked;
    this.checkboxChange.emit(this.checkbox.checked);
  }

}
