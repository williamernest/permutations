import {Component, Input, OnInit, Output} from '@angular/core';
import {TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';

@Component({
  selector: 'app-sandbox-hero',
  templateUrl: './sandbox-hero.component.html',
  styleUrls: ['./sandbox-hero.component.scss']
})
export class SandboxHeroComponent implements OnInit {

  floatingLabel = 'Floating Label';
  value: string = null;
  leadingIcon: string = '';
  trailingIcon: string = '';
  params: TextfieldParameters|string = TextfieldParameters.NoIcon;
  type: TextfieldType|string = TextfieldType.Default;
  state: TextfieldStates|string = TextfieldStates.Default;
  dense = false;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set config(config) {
    for (const conf in config) {
      if (config.hasOwnProperty(conf)) {
        for (const key in config[conf]) {
          if (config[conf].hasOwnProperty(key)) {
            const change = config[conf];
            if (key === 'type') {
              this.type = TextfieldType[change[key]];
            } else if (key === 'state') {
              this.state = TextfieldStates[change[key]];
            } else if (key === 'leadingIcon') {
              this.leadingIcon = change[key];
            } else if (key === 'trailingIcon') {
              this.trailingIcon = change[key];
            }
          }
        }
      }
    }
    this.reSync();
  }

  private reSync() {
    if (this.leadingIcon !== '' && this.trailingIcon !== '') {
      this.params = TextfieldParameters.BothIcons;
    } else if (this.leadingIcon !== '') {
      this.params = TextfieldParameters.LeadingIcon;
    } else if (this.trailingIcon !== '') {
      this.params = TextfieldParameters.TrailingIcon;
    } else {
      this.params = TextfieldParameters.NoIcon;
    }
  }

}
