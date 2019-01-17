import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {SandboxComponent} from './sandbox.component';
import {SandboxHeroComponent} from '../sandbox-hero/sandbox-hero.component';
import {SandboxSidebarComponent} from '../sandbox-sidebar/sandbox-sidebar.component';
import {SandboxHeroOptionsComponent} from '../sandbox-hero-options/sandbox-hero-options.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {HighlightJsModule} from 'ngx-highlight-js';
import {TextFieldComponent} from '../web-components/text-field/text-field.component';
import {SasscodeComponent} from '../sasscode/sasscode.component';
import {CssCodeComponent} from '../css-code/css-code.component';
import {HeaderModule} from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatTabsModule,
    MatIconModule,
    HighlightJsModule,
    HeaderModule,
  ],
  declarations: [
    SandboxComponent,
    SandboxHeroComponent,
    SandboxSidebarComponent,
    SandboxHeroOptionsComponent,
    SasscodeComponent,
    CssCodeComponent,
  ],
  entryComponents: [
    TextFieldComponent,
  ],
  exports: [
    SandboxComponent,
  ]
})
export class SandboxModule { }
