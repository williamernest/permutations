import {Component, ViewEncapsulation} from '@angular/core';
import {TextfieldHelperTextStyles, TextfieldParameters, TextfieldStates, TextfieldType} from '../textfield.enum';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./instances.component.scss']
})

export class InstancesComponent {

  public States = TextfieldStates;
  public Parameters = TextfieldParameters;
  public Types = TextfieldType;
  public HelperTextStyle = TextfieldHelperTextStyles;
}
