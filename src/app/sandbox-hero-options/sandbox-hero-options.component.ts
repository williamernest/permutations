import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sandbox-hero-options',
  templateUrl: './sandbox-hero-options.component.html',
  styleUrls: ['./sandbox-hero-options.component.scss']
})
export class SandboxHeroOptionsComponent implements OnInit {

  config: any = {
    textfield: [
      {
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
    }, {
      name: 'state',
      label: 'States',
      type: 'radio',
      value: 'Default',
      options: [
        {label: 'Default'},
        {label: 'Focused'},
        {label: 'Invalid'},
        {label: 'FocusedInvalid'},
        {label: 'Disabled'}
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
      name: 'label',
      label: 'Floating Label',
      type: 'checkbox-input',
      value: 'Floating Label',
      checked: true,
    }],
    button: [
      {
        name: 'label',
        label: 'Text',
        type: 'checkbox-input',
        value: 'Button',
        checked: true,
      },
      {
        name: 'leadingIcon',
        label: 'Icon',
        type: 'checkbox-input',
        value: 'favorite',
        checked: true,
      },
      {
        name: 'type',
        label: 'Type',
        type: 'radio',
        value: 'Default',
        options: [
          {label: 'Default'},
          {label: 'Raised'},
          {label: 'Unelevated'},
          {label: 'Outlined'},
        ]
      },
      {
        name: 'state',
        label: 'State',
        type: 'radio',
        value: 'Default',
        options: [
          { label: 'Default'},
          { label: 'Disabled'},
        ]
      },
    ]
};

  currentComponent_ = 'textfield';
  @Output() configChange = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    const configuration = this.config[this.currentComponent].map((val) => {
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

  @Input()
  set currentComponent(component) {
    if (component && this.currentComponent_ !== component) {
      this.currentComponent_ = component;
      this.setOptions();
    }
  }

  get currentComponent() {
    return this.currentComponent_;
  }
}
