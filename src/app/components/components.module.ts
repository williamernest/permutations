import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextFieldComponent} from '../web-components/text-field/text-field.component';
import {ChipSetComponent} from '../web-components/chip-set/chip-set.component';
import {ListComponent} from '../web-components/list/list.component';
import {ButtonComponent} from '../web-components/button/button.component';
import {ChipComponent} from '../web-components/chip/chip.component';
import {FilterSelectorComponent} from '../filter-selector/filter-selector.component';
import {RadioSelectorComponent} from '../radio-selector/radio-selector.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextFieldComponent,
    ChipSetComponent,
    ListComponent,
    ButtonComponent,
    ChipComponent,
    FilterSelectorComponent,
    RadioSelectorComponent,
  ],
  exports: [
    TextFieldComponent,
    ChipSetComponent,
    ListComponent,
    ButtonComponent,
    ChipComponent,
    FilterSelectorComponent,
    RadioSelectorComponent
  ]
})
export class ComponentsModule { }
