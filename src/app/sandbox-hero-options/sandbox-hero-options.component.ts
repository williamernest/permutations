import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sandbox-hero-options',
  templateUrl: './sandbox-hero-options.component.html',
  styleUrls: ['./sandbox-hero-options.component.scss']
})
export class SandboxHeroOptionsComponent implements OnInit {

  config: Array<any> = [{
    name: 'type',
    label: 'Types',
    type: 'radio',
    value: 'Default',
    options: [
      {
        label: 'Default',
      },
      {
        label: 'Outlined',
      },
    ]
  },
    {
      name: 'state',
      label: 'States',
      type: 'radio',
      value: 'Default',
      options: [
        {
          label: 'Default',
        },
        {
          label: 'Focused',
        },
        {
          label: 'Invalid',
        },
        {
          label: 'FocusedInvalid',
        },
        {
          label: 'Disabled',
        }
      ]
    },
    {
      name: 'leadingIcon',
      label: 'Leading Icon',
      type: 'checkbox-input',
      value: '3d_rotation',
      checked: false,
    },
    {
      name: 'trailingIcon',
      label: 'Trailing Icon',
      type: 'checkbox-input',
      value: 'directions_transit',
      checked: false,
    },
    {
      name: 'floatingLabel',
      label: 'Floating Label',
      type: 'checkbox-input',
      value: 'Floating Label',
      checked: true,
    }];

  @Output() configChange = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  setOptions() {
    const configuration = this.config.map((val) => {
      const name = val.name;
      const config = {};
      if (val.type === 'checkbox-input') {
        config[name] = val.checked ? val.value : '';
      } else {
        config[name] = val.value;
      }
      return config;
    });

    this.configChange.emit(configuration);
  }

}
