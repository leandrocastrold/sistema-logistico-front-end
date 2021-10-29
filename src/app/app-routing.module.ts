import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceiptComponent } from './input/receipt/receipt.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"operacoes/entrada", 
  loadChildren: () => import('./input/input.module').then(m => m.InputModule)},
  {path:"operacoes/estoque", 
  loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)},
  {path:"operacoes/saida", 
  loadChildren: () => import('./output/output.module').then(m => m.OutputModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
