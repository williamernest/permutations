import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';
import {HttpClient} from '@angular/common/http';
import { MDCMenuSurface } from '@material/menu-surface';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'app-text-field-renderer',
  templateUrl: './text-field-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./text-field-renderer.component.scss']
})
export class TextFieldRendererComponent implements OnInit, AfterViewInit, OnDestroy {

  public Types = TextfieldType;
  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public HelperTextParams = TextfieldHelperTextStyles;

  private tfConfigData_: Array<TfConfig>;
  menuSurface: MDCMenuSurface;
  ripple: MDCRipple;

  @Input() textFields = Array<TfConfig>();
  types: Array<TextfieldType> = [this.Types.Default];
  state: Array<TextfieldStates> = [this.States.Default];
  helperParam = [];
  dense = false;
  leadingIcon = false;
  trailingIcon = false;
  panelOpenState = false;

  constructor(private http: HttpClient, private myElement: ElementRef) { }

  ngOnInit() {
    this.http.get<TfConfig[]>('assets/text-fields.json').subscribe(data => {
      this.tfConfigData = data;
    });
  }

  ngAfterViewInit() {
    const menuEl = this.myElement.nativeElement.querySelector('.mdc-menu-surface');
    const anchorElement = this.myElement.nativeElement.querySelector('.mdc-menu-surface--anchor');

    this.menuSurface = new MDCMenuSurface(menuEl);
    this.menuSurface.setMenuSurfaceAnchorElement(anchorElement);
  }

  ngOnDestroy() {
    if (this.menuSurface) {
      this.menuSurface.destroy();
    }

    if (this.ripple) {
      this.ripple.destroy();
    }
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

    // Experimental work on Hover state
    // if (state === this.States.Hovered) {
    //   // rewrite global styles for :hover to .__hover
    //   for (const key in document.styleSheets) {
    //     if (document.styleSheets[key] instanceof CSSStyleSheet) {
    //       if (document.styleSheets[key].href === null) {
    //         const rules = document.styleSheets[key].cssRules || document.styleSheets[key].rules;
    //         for (const rule in rules) {
    //           if (rules[rule] instanceof CSSStyleRule) {
    //             if (rules[rule].selectorText.includes(':hover')) {
    //               const newRule = rules[rule];
    //               if (value) {
    //                 newRule.selectorText = newRule.selectorText.replace(':hover', '.__hover');
    //               } else {
    //                 newRule.selectorText = newRule.selectorText.replace('.__hover', ':hover');
    //               }
    //               document.styleSheets[key];
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

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

      if (filterObject.leadingIcon !== conf.parameters.includes(TextfieldParameters.LeadingIcon)) {
        return false;
      } else if (filterObject.trailingIcon !== conf.parameters.includes(TextfieldParameters.TrailingIcon)) {
        return false;
      }

      if (conf.parameters.includes(TextfieldParameters.HelperText) && !filterObject.helperParams.includes(conf.helperTextParams)) {
        return false;
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
};
