import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {HeaderModule} from './header/header.module';
import {InstancesModule} from './instances/instances.module';
import {ComponentsModule} from './components/components.module';
import {SandboxModule} from './sandbox/sandbox.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    ComponentsModule,
    AppRoutingModule,
    HeaderModule,
    InstancesModule,
    SandboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
