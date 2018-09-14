import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextFieldComponent } from './web-components/text-field/text-field.component';
import { ButtonComponent } from './web-components/button/button.component';
import { ListComponent } from './web-components/list/list.component';
import { ListRendererComponent } from './web-components/list-renderer/list-renderer.component';
import { ButtonRendererComponent } from './web-components/button-renderer/button-renderer.component';
import { TextFieldRendererComponent } from './web-components/text-field-renderer/text-field-renderer.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { ChipComponent } from './web-components/chip/chip.component';
import { ChipSetComponent } from './web-components/chip-set/chip-set.component';
import { ChipSetRendererComponent } from './web-components/chip-set-renderer/chip-set-renderer.component';
import { MatExpansionModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InstancesComponent } from './instances/instances.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxSidebarComponent } from './sandbox-sidebar/sandbox-sidebar.component';
import { SandboxHeroComponent } from './sandbox-hero/sandbox-hero.component';
import { SandboxHeroOptionsComponent } from './sandbox-hero-options/sandbox-hero-options.component';
import { RadioSelectorComponent } from './radio-selector/radio-selector.component';
import {HeaderModule} from './header/header.module';

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
    InstancesComponent,
    SandboxComponent,
    SandboxSidebarComponent,
    SandboxHeroComponent,
    SandboxHeroOptionsComponent,
    RadioSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
