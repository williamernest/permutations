import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChipComponent implements OnInit {

  @Input() content: string;
  @Input() checkmark = false;
  @Input() leadingIcon: string;
  @Input() trailingIcon: string;
  @Input() selected = false;

  constructor() {
  }

  ngOnInit() {
  }

}
