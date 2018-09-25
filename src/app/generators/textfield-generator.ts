///<reference path="config-generator.ts"/>
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';

export class TextfieldGenerator implements ConfigGenerator<TfConfig> {

  public Types = TextfieldType;
  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public HelperTextParams = TextfieldHelperTextStyles;
  public label = 'Floating Label';

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

  getJSX(config: any = {}) {
    const label = config.label || 'Floating Label';
    const type: string|TextfieldType = config.type || TextfieldType.Default;
    const state: string|TextfieldStates = config.state || TextfieldStates.Disabled;
    const leadingIcon = config.leadingIcon || '';
    const trailingIcon = config.trailingIcon || '';
    const dense = config.dense || false;
    const helperText = config.helperText || '';

    const base = `
    <TextField
        ${label ? 'label=\'' + label + '\'\n' : ''}
        ${type === TextfieldType.Outlined ? 'outlined\n' : ''}
        ${type === TextfieldType.Fullwidth ? 'fullWidth\n' : ''}
        ${dense ? 'dense\n' : ''}
        ${leadingIcon !== '' ? 'leadingIcon=\'{<i className=\'material-icons\'>' + leadingIcon + '</i>}\'\n' : ''}
        ${trailingIcon !== '' ? 'trailingIcon=\'{<i className=\'material-icons\'>' + trailingIcon + '</i>}\'\n' : ''}
        ${helperText !== '' ? 'helperText=\'{<span>' + helperText + '</span>}\'\n' : ''}>\n
        <Input
          value={this.state.value}
          ${state === TextfieldStates.Disabled ? 'disabled\n' : ''}
          onChange={(e) => this.setState({value: e.target.value})}/>
      </TextField>
      `;
    return base;
  }

  getAndroid(config: any = {}) {
    const label = config.label || 'Floating Label';
    const type: string|TextfieldType = config.type || TextfieldType.Default;
    const state: string|TextfieldStates = config.state || TextfieldStates.Disabled;
    const leadingIcon = config.leadingIcon || '';
    const trailingIcon = config.trailingIcon || '';
    const dense = config.dense || false;
    const helperText = config.helperText || '';


    const base = `
<com.google.android.material.textfield.TextInputLayout
    ${this.getAndroidType_(type, dense)}
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    ${label !== '' ? 'android:hint="' + label + '"' : ''}>
  <com.google.android.material.textfield.TextInputEditText
      android:layout_width="match_parent"
      android:layout_height="wrap_content"/>
</com.google.android.material.textfield.TextInputLayout>`;
    return base;
  }

  getWebComponents(config: any = {}) {

    const label = config.label || 'Floating Label';
    const type: string|TextfieldType = config.type || TextfieldType.Default;
    const state: string|TextfieldStates = config.state || TextfieldStates.Disabled;
    const leadingIcon = config.leadingIcon || '';
    const trailingIcon = config.trailingIcon || '';
    const dense = config.dense || false;
    const helperText = config.helperText || '';

    const base = `
    <mwc-textfield
      ${label ? 'label=\'' + label + '\'\n' : ''}
      ${type === TextfieldType.Outlined ? 'outlined\n' : ''}
      ${state === TextfieldStates.Disabled ? 'disabled\n' : ''}
      ${dense ? 'dense\n' : ''}
      ${leadingIcon !== '' ? 'icon=\'' + leadingIcon + '\'\n' : ''}
      ${trailingIcon !== '' ? 'trailingIcon=\'' + trailingIcon + '\'\n' : ''}
      ${helperText !== '' ? 'helperText=\'' + helperText + '\'\n' : ''}>\n
      </mwc-textfield>
    `;

    return base;
  }

  getAndroidType_(type, dense) {
    if (type === TextfieldType.Default) {
      if (dense) {
        return 'style="@style/Widget.MaterialComponents.TextInputLayout.FilledBox.Dense"';
      } else {
        return 'style="@style/Widget.MaterialComponents.TextInputLayout.FilledBox"';
      }
    } else if (type === TextfieldType.Outlined) {
      if (dense) {
        return 'style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.Dense"';
      } else {
        return 'style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"';
      }
    }
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
