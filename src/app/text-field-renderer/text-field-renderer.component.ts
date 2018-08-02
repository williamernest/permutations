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

  @Input() textFields = Array<Object>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Used to generate a new JSON file
    // let tfConfig = this.getTextfieldTypes_();
    // tfConfig = this.appendTextfieldStates_(tfConfig);
    // tfConfig = this.appendParameters_(tfConfig);
    // tfConfig = this.appendHelperTextParams_(tfConfig);
    // tfConfig = this.appendDense_(tfConfig);
    this.http.get<TfConfig[]>('/assets/text-fields.json').subscribe(data => this.textFields = data);
  }

  getTextfieldTypes_() {
    const arr = Array<TfConfig>();
    for (const type in TextfieldType) {
      if (!isNaN(Number(type))) {
        const newConfig = new TfConfig();
        newConfig.type = TextfieldType[TextfieldType[type]];
        arr.push(newConfig);
      }
    }

    return arr;
  }

  appendTextfieldStates_(types: Array<TfConfig>): Array<TfConfig> {
    const configs = [];

    for (const state in TextfieldStates) {
      if (!TextfieldStates.hasOwnProperty(state)) {
        continue;
      }

      let arr = JSON.parse(JSON.stringify(types));
      if (!isNaN(Number(state))) {
        arr.forEach((type) => type.state = TextfieldStates[TextfieldStates[state]]);
        configs.push(...arr);
        arr = JSON.parse(JSON.stringify(types));
      }
    }
    return configs;
  }

  appendParameters_(configs: Array<TfConfig>): Array<TfConfig> {
    const returnConfigs = Array<TfConfig>();
    const paramPermutations = this.getParameterPermutations_();

    paramPermutations.forEach(param => {
      let tempConfigs = JSON.parse(JSON.stringify(configs));
      tempConfigs.forEach(conf => conf.parameters = param);

      // Filter out textareas and fullwidth variants for leading/trailing icon since it's not supported.
      // TODO: Fix this filter
      tempConfigs = tempConfigs.filter(conf =>
        !((conf.type === TextfieldType.Textarea || conf.type === TextfieldType.FullwidthTextArea || conf.type === TextfieldType.Fullwidth)
          && (conf.parameters.includes(TextfieldParameters.TrailingIcon) || conf.parameters.includes(TextfieldParameters.LeadingIcon))));

      returnConfigs.push(...tempConfigs);
    });

    return returnConfigs;
  }

  appendDense_(configs: Array<TfConfig>): Array<TfConfig> {
    const temp = JSON.parse(JSON.stringify(configs));
    temp.forEach(config => config.dense = true);
    return configs.concat(temp);
  }

  appendHelperTextParams_(configs: Array<TfConfig>): Array<TfConfig> {
    const completeConfigs = configs.filter(config => !(config.parameters && config.parameters.includes(TextfieldParameters.HelperText)));
    const filterConfigs = configs.filter(config => config.parameters && config.parameters.includes(TextfieldParameters.HelperText));

    for (const param in TextfieldHelperTextStyles) {
      if (!isNaN(Number(param))) {
        const tempConfigs = JSON.parse(JSON.stringify(filterConfigs));
        tempConfigs.forEach(config => config.helperTextParams = TextfieldHelperTextStyles[TextfieldHelperTextStyles[param]]);
        completeConfigs.push(...tempConfigs);
      }
    }

    return completeConfigs;
  }

  getParameterPermutations_(): Array<Array<TextfieldParameters>> {
    let arr = [[]];
    for (const param in TextfieldParameters) {
      if (!isNaN(Number(param))) {
        const tempArr = JSON.parse(JSON.stringify(arr)); // Duplicate the array
        tempArr.forEach((permutation) => permutation.push(TextfieldParameters[TextfieldParameters[param]]));
        arr.push(...tempArr);
      }
    }

    // Filter leading && trailing icons since it doesn't render properly.
    arr = arr.filter((eachArr) => {
      return !(eachArr.includes(TextfieldParameters.LeadingIcon) && eachArr.includes(TextfieldParameters.TrailingIcon));
    });

    return arr;
  }

}

class TfConfig {
  label = 'Floating Label';
  value: string;
  dense: boolean;
  state: TextfieldStates;
  type: TextfieldType;
  parameters: Array<TextfieldParameters>;
  leadingIcon = 'directions_transit';
  trailingIcon = '3d_rotation';
  helperText = 'Helper text';
}
