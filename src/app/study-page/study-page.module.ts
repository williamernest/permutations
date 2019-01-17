import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxComponent} from '../sandbox/sandbox.component';
import {StudyPageComponent} from './study-page.component';
import {SandboxModule} from '../sandbox/sandbox.module';
import {ButtonComponent} from '../web-components/button/button.component';
import {ComponentsModule} from '../components/components.module';
import {RadioSelectorComponent} from '../radio-selector/radio-selector.component';
import {PixelsToDpPipe} from '../pixels-to-dp.pipe';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    SandboxModule,
    ComponentsModule,
    ColorPickerModule
  ],
  declarations: [
    StudyPageComponent,
    PixelsToDpPipe
  ],
  entryComponents: [
    SandboxComponent,
    ButtonComponent,
    RadioSelectorComponent
  ]
})
export class StudyPageModule { }
