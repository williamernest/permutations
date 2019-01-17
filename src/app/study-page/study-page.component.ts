import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudyPageComponent implements OnInit {

  type = 'Raised';
  styleOverride = {
    'border-radius': '4px',
    '--mdc-theme-primary': '#6200ee',
  };

  border_radius_value = 4;
  panelOpen = false;

  constructor() {
  }

  ngOnInit() { }

  setBorderRadius(value: string) {
    this.border_radius_value = parseInt(value, 10);
    this.styleOverride['border-radius'] = value + 'px';
  }

  togglePanel(event) {
    event.target.classList[event.target.classList.contains('opened') ? 'remove' : 'add']('opened');
  }
}
