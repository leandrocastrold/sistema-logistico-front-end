import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() links: any[] = [
    {name:"OP01", link:"OP01"},
    {name:"OP02", link:"OP02"},
    {name:"OP03", link:"OP03"},
  ];

  @Input() toolbarTitle: string = '';


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  mostrar(index: number) {
    this.router.navigate([this.links[index].link], {relativeTo:this.route});
  }

}
