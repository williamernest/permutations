import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropPxPipe} from '../drop-px.pipe';

@NgModule({
  declarations: [
    DropPxPipe
],
  imports: [
    CommonModule
  ],
  exports: [
    DropPxPipe
  ],
  providers: [
    DropPxPipe
  ]
})
export class SharedModule { }
