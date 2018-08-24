import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../../textfield.enum';
import {HttpClient} from '@angular/common/http';
import { MDCMenuSurface } from '@material/menu-surface';
import { MDCRipple } from '@material/ripple';
import {TextfieldGenerator} from '../../generators/textfield-generator';

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

  private generator: TextfieldGenerator = new TextfieldGenerator();

  private tfConfigData_: Array<TfConfig>;
  menuSurface: MDCMenuSurface;
  ripple: MDCRipple;

  @Input() textFields = Array<TfConfig>();
  types: Array<TextfieldType> = [this.Types.Default];
  state: Array<TextfieldStates> = [this.States.Default];
  helperParams: Array<TextfieldHelperTextStyles> = [this.HelperTextParams.None];
  dense = false;
  params: Array<TextfieldParameters> = [this.Parameters.NoIcon];
  panelOpenState = false;

  constructor(private http: HttpClient, private myElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const menuEl = this.myElement.nativeElement.querySelector('.mdc-menu-surface');

    this.menuSurface = new MDCMenuSurface(menuEl);
    this.filterData();
  }

  ngOnDestroy() {
    if (this.menuSurface) {
      this.menuSurface.destroy();
    }

    if (this.ripple) {
      this.ripple.destroy();
    }
  }

  toggleMenu(event) {
    const anchorElement = this.myElement.nativeElement.querySelector('.mdc-menu-surface--anchor');

    this.menuSurface.setMenuSurfaceAnchorElement(anchorElement);
    this.menuSurface.open = !this.menuSurface.open;
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

  statesChanged(state: TextfieldStates, value: boolean) {
    if (value) {
      if (!this.state.includes(state)) {
        this.state.push(state);
      }
    } else {
      if (this.state.includes(state)) {
        this.state.splice(this.state.indexOf(state), 1);
      }
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

  paramsChanged(param: TextfieldParameters, value: boolean) {
    if (value) {
      if (!this.params.includes(param)) {
        this.params.push(param);
      }
    } else {
      if (this.params.includes(param)) {
        this.params.splice(this.params.indexOf(param), 1);
      }
    }

    this.filterData();
  }

  helperParamsChanged(param: TextfieldHelperTextStyles, value: boolean) {
    if (value) {
      if (!this.helperParams.includes(param)) {
        this.helperParams.push(param);
      }
    } else {
      if (this.helperParams.includes(param)) {
        this.helperParams.splice(this.helperParams.indexOf(param), 1);
      }
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
    this.generator.filters = {
      types: this.types,
      states: this.state,
      parameters: this.params,
      helperTextParams: this.helperParams,
      dense: this.dense,
    };
    this.textFields = this.generator.generate() as TfConfig[];

  }
  //   this.textFields = this.tfConfigData_.filter((conf) => {
  //     if (!this.types.includes(conf.type)) {
  //       return false;
  //     }
  //
  //     if (!this.state.includes(conf.state)) {
  //       return false;
  //     }
  //
  //     conf.dense = conf.dense === undefined ? false : conf.dense;
  //
  //     if (this.dense !== conf.dense) {
  //       return false;
  //     }
  //
  //     if (this.helperParams.length === 0 && conf.helperTextParams) {
  //       return false;
  //     }
  //
  //
  //
  //     if (this.helperParams.length > 0 && !this.helperParams.includes(conf.helperTextParams)) {
  //       return false;
  //     }
  //
  //     return true;
  //   });
  // }

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
