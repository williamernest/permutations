import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  open = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDrawer() {
    this.open = !this.open;
  }

}
