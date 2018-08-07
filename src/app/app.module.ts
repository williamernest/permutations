import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { TextFieldRendererComponent } from './text-field-renderer/text-field-renderer.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { ChipComponent } from './chip/chip.component';
import { ChipSetComponent } from './chip-set/chip-set.component';
import { ChipSetRendererComponent } from './chip-set-renderer/chip-set-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    TextFieldComponent,
    ButtonComponent,
    ListComponent,
    ButtonRendererComponent,
    TextFieldRendererComponent,
    FilterSelectorComponent,
    ChipComponent,
    ChipSetComponent,
    ChipSetRendererComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
