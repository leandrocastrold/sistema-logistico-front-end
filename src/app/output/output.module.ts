import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputRoutingModule } from './output-routing.module';
import { SeparationComponent } from './separation/separation.component';
import { ConferenceComponent } from './conference/conference.component';
import { ExpeditionComponent } from './expedition/expedition.component';
import { OutputToolbarComponent } from './output-toolbar/output-toolbar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SeparationComponent,
    ConferenceComponent,
    ExpeditionComponent,
    OutputToolbarComponent
  ],
  imports: [
    CommonModule,
    OutputRoutingModule,
    SharedModule
  ]
})
export class OutputModule { }
