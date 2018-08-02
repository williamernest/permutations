import {Component, ViewEncapsulation} from '@angular/core';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from './textfield.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public Types = TextfieldType;
  public HelperTextStyle = TextfieldHelperTextStyles;
}
