import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InstancesComponent} from './instances.component';
import {ComponentsModule} from '../components/components.module';
import {MatExpansionModule} from '@angular/material';
import {TextFieldRendererComponent} from '../web-components/text-field-renderer/text-field-renderer.component';
import {ListRendererComponent} from '../web-components/list-renderer/list-renderer.component';
import {ChipSetRendererComponent} from '../web-components/chip-set-renderer/chip-set-renderer.component';
import {ButtonRendererComponent} from '../web-components/button-renderer/button-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatExpansionModule,
  ],
  declarations: [
    TextFieldRendererComponent,
    ListRendererComponent,
    ChipSetRendererComponent,
    ButtonRendererComponent,
    InstancesComponent,
  ]
})
export class InstancesModule { }
