import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-toolbar',
  templateUrl: './input-toolbar.component.html',
  styleUrls: ['./input-toolbar.component.scss']
})
export class InputToolbarComponent implements OnInit {

  inputLinks: any[] = [
    {name:"Recebimento",
     link:"recebimento"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
