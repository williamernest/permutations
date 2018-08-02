import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ButtonState, ButtonType} from '../button-config';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements OnInit {

  @Input() buttons: Array<Object> = [];

  constructor() {
  }

  ngOnInit() {
    this.initializeIfEmpty_();
  }

  initializeIfEmpty_() {
    if (this.buttons.length === 0) {
      for (const type in ButtonType) {
        if (isNaN(Number(type))) {
          let obj = {text: 'Hello World', icon: 'directions_transit'};
          obj['type'] = type;
          for (const state in ButtonState) {
            if (isNaN(Number(state))) {
              obj['state'] = state;
              obj['dense'] = false;
              this.buttons.push(obj);
              obj = {...obj};
              obj['dense'] = true;
              this.buttons.push(obj);
              obj = {...obj};
            }
          }
        }
      }
    }
  }

}

// class config {
//   text: string;
//   icon: string;
//   state: ButtonState;
//   type: ButtonType;
//   dense: boolean;
// }
