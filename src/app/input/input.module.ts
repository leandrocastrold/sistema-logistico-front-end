import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputRoutingModule } from './input-routing.module';
import { ReceiptComponent } from './receipt/receipt.component';
import { SharedModule } from '../shared/shared.module';
import { InputToolbarComponent } from './input-toolbar/input-toolbar.component';

@NgModule({
  declarations: [
    ReceiptComponent,
    InputToolbarComponent
  ],
  imports: [
    CommonModule,
    InputRoutingModule,
    SharedModule
  ]
})
export class InputModule { }
