import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';
import { ChipsComponent } from './chips/chips.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    TextFieldComponent,
    ButtonComponent,
    ListComponent,
    ChipsComponent,
    ButtonRendererComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
