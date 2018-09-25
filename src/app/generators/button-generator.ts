///<reference path="code-generator.ts"/>
import {ButtonState, ButtonType} from '../button-config';
import {Button} from 'selenium-webdriver';

export class ButtonGenerator implements CodeGenerator {

  public Types = ButtonType.Default;
  public States = ButtonState.Default;
  public label = 'Button';
  public icon = '';
  public dense = false;

  getJSX(config: any = {}) {
    const label = config.label || '';
    const type: string|ButtonType = ButtonType[config.type] || ButtonType.Default;
    const state: string|ButtonState = ButtonState[config.state] || ButtonState.Default;
    const icon = config.leadingIcon || '';
    const dense = config.dense || false;

    return `
<Button
    ${label ? 'label=\'' + label + '\'\n' : ''}
    ${type === ButtonType.Raised ? 'raised\n' : ''}
    ${type === ButtonType.Unelevated ? 'unelevated\n' : ''}
    ${type === ButtonType.Outlined ? 'outlined\n' : ''}
    ${dense ? 'dense\n' : ''}
    ${state === ButtonState.Disabled ? 'disabled\n' : ''}
    ${icon !== '' ? 'icon=\'{<i className=\'material-icons\'>' + icon + '</i>}\'\n' : ''}>
  {label}
</Button>`;
  }

  getAndroid(config: any = {}) {
    const label = config.label || '';
    const type: string|ButtonType = ButtonType[config.type] || ButtonType.Default;
    const state: string|ButtonState = ButtonState[config.state] || ButtonState.Default;
    const icon = config.leadingIcon || '';
    const dense = config.dense || false;

    if (type === ButtonType.Outlined) {
      return 'Unsupported type.';
    }

    const base = `
<com.google.android.material.button.MaterialButton
    android:id="@+id/material_button"
    style="@style/Widget.MaterialComponents.Button${this.getAndroidStyle_(type)}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="${label}"
    ${state === ButtonState.Disabled ? 'android:enabled="false"' : ''}
    />`;

    return base;
  }

  getAndroidStyle_(type) {
    let style;
    switch (type) {
      case ButtonType.Raised:
        style = '';
        break;
      case ButtonType.Unelevated:
        style = '.UnelevatedButton';
        break;
      case ButtonType.Outlined:
        style = '';
        break;
      default:
        style = '.TextButton';
    }

    return style;
  }

  getIOS(config) {
    return '';
  }

  getFlutter(config) {
    return '';
  }

  getWebComponents(config: any = {}) {
    const label = config.label || '';
    const type: string|ButtonType = ButtonType[config.type] || ButtonType.Default;
    const state: string|ButtonState = ButtonState[config.state] || ButtonState.Default;
    const icon = config.leadingIcon || '';
    const dense = config.dense || false;

    const base = `
    <mwc-button
      ${label ? 'label=\'' + label + '\'\n' : ''}
      ${type === ButtonType.Raised ? 'raised\n' : ''}
      ${type === ButtonType.Unelevated ? 'unelevated\n' : ''}
      ${type === ButtonType.Outlined ? 'outlined\n' : ''}
      ${dense ? 'dense\n' : ''}
      ${state === ButtonState.Disabled ? 'disabled\n' : ''}
      ${icon !== '' ? 'icon=\'' + icon + '\'\n' : ''}>\n
      </mwc-button>
    `;

    return base;
  }
}
