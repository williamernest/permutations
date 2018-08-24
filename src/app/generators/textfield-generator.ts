///<reference path="config-generator.ts"/>
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';

export class TextfieldGenerator implements ConfigGenerator<TfConfig> {

  public Types = TextfieldType;
  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public HelperTextParams = TextfieldHelperTextStyles;

  private filters_: {
    types: Array<TextfieldType>,
    states: Array<TextfieldStates>,
    parameters: Array<TextfieldParameters>,
    helperTextParams: Array<TextfieldHelperTextStyles>,
    dense: boolean} =
    {types: [TextfieldType.Default], states: [TextfieldStates.Default], parameters: [], helperTextParams: [], dense: false};

  generate(): Array<TfConfig> {
    let tf = this.getTextfieldTypes_();
    tf = this.appendTextfieldStates_(tf);
    tf = this.appendParameters_(tf);
    tf = this.appendHelperTextParams_(tf);
    tf = this.appendDense_(tf);
    return tf;
  }

  set filters(arr) {
    this.filters_ = arr;
  }

  get filters() {
    return this.filters_;
  }

  getTextfieldTypes_() {
    const arr = Array<TfConfig>();
    for (const type in TextfieldType) {
      if (!isNaN(Number(type))) {
        if (this.filters_.types.includes(TextfieldType[TextfieldType[type]])) {
          const newConfig = new TfConfig();
          newConfig.type = TextfieldType[TextfieldType[type]];
          arr.push(newConfig);
        }
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

      if (this.filters_.states.includes(TextfieldStates[TextfieldStates[state]])) {
        let arr = JSON.parse(JSON.stringify(types));
        if (!isNaN(Number(state))) {
          arr.forEach((type) => type.state = TextfieldStates[TextfieldStates[state]]);
          configs.push(...arr);
          arr = JSON.parse(JSON.stringify(types));
        }
      }
    }
    return configs;
  }

  appendParameters_(configs: Array<TfConfig>): Array<TfConfig> {
    let returnConfigs = Array<TfConfig>();
    const paramPermutations = this.getParameterPermutations_();

    // Filter out textareas and fullwidth variants for leading/trailing icon since it's not supported.
    // TODO: Fix this filter
    let tempConfigs = configs.filter(conf =>
      !((conf.type === TextfieldType.Textarea || conf.type === TextfieldType.FullwidthTextArea || conf.type === TextfieldType.Fullwidth)));

    paramPermutations.forEach(param => {
      tempConfigs = JSON.parse(JSON.stringify(tempConfigs));
      tempConfigs.forEach(conf => conf.parameters = param);
      returnConfigs.push(...tempConfigs);
    });

    const textareas = configs.filter(conf =>
      ((conf.type === TextfieldType.Textarea || conf.type === TextfieldType.FullwidthTextArea || conf.type === TextfieldType.Fullwidth)));

    textareas.forEach(conf => conf.parameters = TextfieldParameters.NoIcon);

    returnConfigs = returnConfigs.concat(...textareas);

    return returnConfigs;
  }

  appendDense_(configs: Array<TfConfig>): Array<TfConfig> {
    configs.forEach(config => config.dense = this.filters_.dense);
    return configs;
  }

  appendHelperTextParams_(configs: Array<TfConfig>): Array<TfConfig> {
    const temp = [];
    for (const param in TextfieldHelperTextStyles) {
      if (!isNaN(Number(param))) {
        if (this.filters_.helperTextParams.includes(TextfieldHelperTextStyles[TextfieldHelperTextStyles[param]])) {
          const tempConfigs = JSON.parse(JSON.stringify(configs));
          tempConfigs.forEach(config => config.helperTextParams = TextfieldHelperTextStyles[TextfieldHelperTextStyles[param]]);
          temp.push(...tempConfigs);
        }
      }
    }

    return temp;
  }

  getParameterPermutations_(): Array<TextfieldParameters> {
    return this.filters_.parameters;
  }

}

class TfConfig {
  label = 'Floating Label';
  value: string;
  dense = false;
  state: TextfieldStates;
  type: TextfieldType;
  parameters: TextfieldParameters;
  helperTextParams: TextfieldHelperTextStyles;
  leadingIcon = 'directions_transit';
  trailingIcon = '3d_rotation';
  helperText = 'Helper text';
}
