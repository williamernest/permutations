import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstancesComponent} from '../instances/instances.component';
import {SandboxComponent} from '../sandbox/sandbox.component';
import {ThemePageComponent} from '../theme-page/theme-page.component';
import {StudyPageComponent} from '../study-page/study-page.component';
import {StudyPageTfComponent} from '../study-page-tf/study-page-tf.component';

const routes: Routes = [
  { path: '', redirectTo: '/instances', pathMatch: 'full' },
  { path: 'instances', component: InstancesComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: 'theme', component: ThemePageComponent },
  { path: 'study', component: StudyPageComponent },
  { path: 'study-tf', component: StudyPageTfComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
})
export class AppRoutingModule {}
