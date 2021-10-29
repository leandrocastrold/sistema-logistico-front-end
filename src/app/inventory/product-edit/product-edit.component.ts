import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { GeneralService } from 'src/app/shared/general.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private generalService: GeneralService) { }

  id: string = "";
  product: Product = {
    name: "",
    type: "",
    description: "",
    price: 0
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.productService.getById(this.id).subscribe(p => {
        this.product = p;
        console.log(p)
      })
    })
  }

  saveProduct() {
    this.productService.save(this.id, this.product).subscribe(p => {
      this.generalService.openSnackBar("Dados atualizados.", true)
      this.router.navigate(["/operacoes/estoque/consulta"])
    })
  }

}