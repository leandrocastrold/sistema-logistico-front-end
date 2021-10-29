import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputToolbarComponent } from './input-toolbar/input-toolbar.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  {path:"", redirectTo:"recebimento"},
  {path:"", component:InputToolbarComponent, children:[
    {path:"recebimento", component:ReceiptComponent, pathMatch:"FULL"}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputRoutingModule { }
