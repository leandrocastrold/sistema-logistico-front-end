import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-toolbar',
  templateUrl: './inventory-toolbar.component.html',
  styleUrls: ['./inventory-toolbar.component.scss']
})
export class InventoryToolbarComponent implements OnInit {

  inventoryLinks: any[] = [
    {name:"Cadastro", link:"cadastro"},
    {name:"Consulta", link:"consulta"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
