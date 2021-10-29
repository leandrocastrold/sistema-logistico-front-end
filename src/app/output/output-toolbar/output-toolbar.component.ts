import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-toolbar',
  templateUrl: './output-toolbar.component.html',
  styleUrls: ['./output-toolbar.component.scss']
})
export class OutputToolbarComponent implements OnInit {

  outputLinks: any[] = [
    {name:"Separação", link:"separacao"},
    {name:"Conferência", link:"conferencia"},
    {name:"Expedição", link:"expedicao"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
