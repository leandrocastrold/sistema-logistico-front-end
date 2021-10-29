import { Component, OnInit } from '@angular/core';
import { PositionService } from 'src/app/position-product/position.service';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { GeneralService } from 'src/app/shared/general.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private productService: ProductService,
    private positionService: PositionService,
    private generalService: GeneralService) { }

  product: Product = {
    name: "",
    type: "",
    description: "",
    price: 0
  }

  ngOnInit(): void {
  }

  registerProduct() {
    this.productService.create(this.product).subscribe(p => {
      console.log("Produto criado. Definindo posição no estoque...");
      this.positionService.create(p).subscribe(() => {
        this.generalService.openSnackBar(`Produto de cadastrado!`,true)
        this.generalService.reloadCurrentRoute();
      })
    });
  }
}


