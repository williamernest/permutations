import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  open_ = false;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set open(val) {
    this.open_ = val;
  }

  get open() {
    return this.open_;
  }
}
