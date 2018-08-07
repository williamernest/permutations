import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-text-field-renderer',
  templateUrl: './text-field-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./text-field-renderer.component.scss']
})
export class TextFieldRendererComponent implements OnInit {

  public Types = TextfieldType;
  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public HelperTextParams = TextfieldHelperTextStyles;

  private tfConfigData_: Array<TfConfig>;

  @Input() textFields = Array<TfConfig>();
  types = Array<TextfieldType>();
  state = Array<TextfieldStates>();
  helperParam = Array<TextfieldHelperTextStyles>();
  dense = false;
  leadingIcon = false;
  trailingIcon = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<TfConfig[]>('assets/text-fields.json').subscribe(data => this.tfConfigData = data);
  }

  typeChanged(type, value) {
    if (value) {
      this.types.push(type);
    } else {
      const index = this.types.indexOf(type);
      this.types.splice(index, 1);
    }

    this.filterData();
  }

  statesChanged(state, value) {
    if (value) {
      this.state.push(state);
    } else {
      const index = this.state.indexOf(state);
      this.state.splice(index, 1);
    }

    this.filterData();
  }

  paramsChanged(param, value) {
    switch (param) {
      case this.Parameters.TrailingIcon:
        this.trailingIcon = value;
        break;
      case this.Parameters.LeadingIcon:
        this.leadingIcon = value;
        break;
      default:
        break;
    }

    this.filterData();
  }

  helperParamsChanged(param, value) {
    if (value) {
      this.helperParam.push(param);
    } else {
      const index = this.helperParam.indexOf(param);
      this.helperParam.splice(index, 1);
    }

    this.filterData();

  }

  denseChanged(value) {
    this.dense = value;
    this.filterData();
  }

  set tfConfigData(tfConfigData: Array<TfConfig>) {
    this.tfConfigData_ = tfConfigData;
    this.filterData();
  }

  filterData(): void {
    const filterObject = {
      type: this.types,
      state: this.state,
      dense: this.dense,
      leadingIcon: this.leadingIcon,
      trailingIcon: this.trailingIcon,
      helperParams: this.helperParam,
    };

    this.textFields = this.tfConfigData_.filter((conf) => {
      if (filterObject.type.length > 0) {
        if (!filterObject.type.includes(conf.type)) {
          return false;
        }
      }

      if (filterObject.state.length > 0) {
        if (!filterObject.state.includes(conf.state)) {
          return false;
        }
      }

      conf.dense = conf.dense === undefined ? false : conf.dense;

      if (filterObject.dense !== conf.dense) {
        return false;
      }


      if (filterObject.leadingIcon && filterObject.trailingIcon) {
        if (!(conf.parameters.includes(TextfieldParameters.LeadingIcon) || conf.parameters.includes(TextfieldParameters.TrailingIcon))) {
          return false;
        }
      } else if (filterObject.leadingIcon && !conf.parameters.includes(TextfieldParameters.LeadingIcon)) {
        return false;
      } else if (filterObject.trailingIcon && !conf.parameters.includes(TextfieldParameters.TrailingIcon)) {
        return false;
      }

      if (filterObject.helperParams.length > 0) {
        if (!filterObject.helperParams.includes(conf.helperTextParams)) {
          return false;
        }
      }

      return true;
    });
  }

}

class TfConfig {
  label = 'Floating Label';
  value: string;
  dense = false;
  state: TextfieldStates;
  type: TextfieldType;
  parameters: Array<TextfieldParameters>;
  helperTextParams: TextfieldHelperTextStyles;
  leadingIcon = 'directions_transit';
  trailingIcon = '3d_rotation';
  helperText = 'Helper text';
}
