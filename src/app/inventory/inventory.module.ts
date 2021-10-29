import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryToolbarComponent } from './inventory-toolbar/inventory-toolbar.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    ConsultationComponent,
    InventoryToolbarComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ]
})
export class InventoryModule { }
