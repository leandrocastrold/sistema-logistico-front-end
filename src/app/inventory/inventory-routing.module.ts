import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { InventoryToolbarComponent } from './inventory-toolbar/inventory-toolbar.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"", redirectTo:"cadastro"},
  {path:"", component:InventoryToolbarComponent, children: [
    {path:"cadastro", component:RegistrationComponent},
    {path:"consulta", component:ConsultationComponent},
    {path:"edicao-produto/:id", component:ProductEditComponent}  
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
