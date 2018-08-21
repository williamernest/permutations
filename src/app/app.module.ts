import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';
import { ListRendererComponent } from './list-renderer/list-renderer.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { TextFieldRendererComponent } from './text-field-renderer/text-field-renderer.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { ChipComponent } from './chip/chip.component';
import { ChipSetComponent } from './chip-set/chip-set.component';
import { ChipSetRendererComponent } from './chip-set-renderer/chip-set-renderer.component';
import { ComponentDrawerComponent } from './component-drawer/component-drawer.component';
import { TopAppBarComponent } from './top-app-bar/top-app-bar.component';
import { HeaderComponent } from './header/header.component';
import {MatExpansionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    TextFieldComponent,
    ButtonComponent,
    ListComponent,
    ListRendererComponent,
    ButtonRendererComponent,
    TextFieldRendererComponent,
    FilterSelectorComponent,
    ChipComponent,
    ChipSetComponent,
    ChipSetRendererComponent,
    ComponentDrawerComponent,
    TopAppBarComponent,
    HeaderComponent,
    FilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
