import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import ListItem from '../list-item';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() dense = false;
  @Input() avatarList = false;
  @Input() nonInteractive = false;
  @Input() twoLine = false;
  @Input() items: Array<ListItem>;

  currentClasses_ = {};

  constructor() { }

  ngOnInit() {
    this.setCurrentClasses();
  }

  setCurrentClasses() {
    this.currentClasses_ = {
      'mdc-list--avatar-list': this.avatarList,
      'mdc-list--dense': this.dense,
      'mdc-list--non-interactive': this.nonInteractive,
      'mdc-list--two-line': this.twoLine,
    };
  }

}
