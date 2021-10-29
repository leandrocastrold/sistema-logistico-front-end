import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferenceComponent } from './conference/conference.component';
import { ExpeditionComponent } from './expedition/expedition.component';
import { OutputToolbarComponent } from './output-toolbar/output-toolbar.component';
import { SeparationComponent } from './separation/separation.component';

const routes: Routes = [
  {path:"", redirectTo:"separacao"},
  {path:"", component:OutputToolbarComponent, children:[
   {path:"separacao", component:SeparationComponent},
   {path:"conferencia", component: ConferenceComponent},
   {path:"expedicao", component: ExpeditionComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule { }
