import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopAppBarComponent} from '../top-app-bar/top-app-bar.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {ColorChangerComponent} from '../color-changer/color-changer.component';
import {HeaderComponent} from './header.component';
import {ComponentDrawerComponent} from '../component-drawer/component-drawer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerModule,
    RouterModule,
  ],
  declarations: [
    TopAppBarComponent,
    ColorChangerComponent,
    HeaderComponent,
    ComponentDrawerComponent,
  ],
  exports: [
    TopAppBarComponent,
    HeaderComponent,
    ComponentDrawerComponent,
  ]
})
export class HeaderModule { }
