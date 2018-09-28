import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';
import * as shortId from 'shortid';
import {TextfieldStates} from '../textfield.enum';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit, AfterViewInit {

  State = TextfieldStates;

  checkbox: MDCCheckbox;
  componentId: string;
  value_ = '';
  @Input() checked = false;
  @Input() input = false;
  @Input() label = '';
  @Output() checkboxChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<string>();
  state = this.State.Disabled;

  constructor(private myElement: ElementRef) {
    this.componentId = shortId.generate();
  }

  ngOnInit() {
    this.checkbox = new MDCCheckbox(this.myElement.nativeElement.querySelector('.mdc-checkbox'));
  }

  ngAfterViewInit() {
    this.state = this.checked ? this.State.Default : this.State.Disabled;
  }

  @Input()
  get value() {
    return this.value_;
  }

  set value(val) {
    this.value_ = val;
    this.valueChange.emit(this.value_);
  }

  changed() {
    this.checked = this.checkbox.checked;
    this.state = this.checked ? this.State.Default : this.State.Disabled;
    this.checkboxChange.emit(this.checkbox.checked);
  }

}
