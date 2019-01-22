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
import {StylesService} from './styles.service';
import { ThemePageComponent } from './theme-page/theme-page.component';
import {StudyPageModule} from './study-page/study-page.module';
import {SharedModule} from './shared/shared.module';
import {DropPxPipe} from './drop-px.pipe';
import {StudyPageTfModule} from './study-page-tf/study-page-tf.module';

@NgModule({
  declarations: [
    AppComponent,
    ThemePageComponent
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
    SandboxModule,
    StudyPageModule,
    StudyPageTfModule,
    SharedModule
  ],
  providers: [
    StylesService,
    DropPxPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
