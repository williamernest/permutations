import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxComponent} from '../sandbox/sandbox.component';
import {StudyPageTfComponent} from './study-page-tf.component';
import {SandboxModule} from '../sandbox/sandbox.module';
import {ButtonComponent} from '../web-components/button/button.component';
import {ComponentsModule} from '../components/components.module';
import {RadioSelectorComponent} from '../radio-selector/radio-selector.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SandboxModule,
    ComponentsModule,
    ColorPickerModule,
    SharedModule
  ],
  declarations: [
    StudyPageTfComponent
  ],
  entryComponents: [
    SandboxComponent,
    ButtonComponent,
    RadioSelectorComponent
  ]
})
export class StudyPageTfModule { }
