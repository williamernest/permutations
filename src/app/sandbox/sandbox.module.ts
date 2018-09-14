import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {SandboxComponent} from './sandbox.component';
import {SandboxHeroComponent} from '../sandbox-hero/sandbox-hero.component';
import {SandboxSidebarComponent} from '../sandbox-sidebar/sandbox-sidebar.component';
import {SandboxHeroOptionsComponent} from '../sandbox-hero-options/sandbox-hero-options.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  declarations: [
    SandboxComponent,
    SandboxHeroComponent,
    SandboxSidebarComponent,
    SandboxHeroOptionsComponent,
  ]
})
export class SandboxModule { }
