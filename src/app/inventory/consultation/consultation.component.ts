import { Component, OnInit } from '@angular/core';
import { ProdPosition } from 'src/app/position-product/position';
import { PositionService } from 'src/app/position-product/position.service';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { GeneralService } from 'src/app/shared/general.service';
import { JsonConverterService } from 'src/app/shared/json-converter.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  positions: ProdPosition[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'availableQuantity', 'reserveQuantity', 'actions'];

  dummyProducts: Product[] = [

    {
      name: "Biela",
      description: "Peça MOTO",
      price: 100,
      type: "MOTO"
    },
    {
      name: "Pneu Putréli",
      description: "Pneu BIKE Aro 26",
      price: 10,
      type: "BIKE"
    },
    {
      name: "Kit de Transmissão",
      description: "Peça MOTO",
      price: 60,
      type: "MOTO"
    },
  ]

  constructor(private jsonConverter: JsonConverterService,
    private positionService: PositionService,
    private productService: ProductService,
    private generalService: GeneralService) { }

  ngOnInit(): void {

  }

  verifyIfIdIsValid(id: string) {
    if (id) {
      this.positionService.findPositionByProductId(id).subscribe(p => {
        if (p != null) {
          console.log(p)
          this.positions = [];
          this.positions.push(p);
        } else {
          this.generalService.openSnackBar(`Produto de ID ${id} não encontrado.`,false)
        }
      })
    } else {
      this.fillTableWithList();
    }
  }


  generateDummyData() {
    this.productService.get().subscribe(data => {
      if (this.jsonConverter.convertPageableToJson(data) == "[]") {
        console.log("Lista vazia. Criando lista fictícia...")
        this.dummyProducts.forEach(p => {
          this.productService.create(p).subscribe(p => {
            this.positionService.create(p).subscribe(pos => {
              console.log(`${p} criado`)
              this.positionService.patch(p.id!, "10000").subscribe(p => {
                console.log(`Lista criada com êxito!`)
                this.generalService.reloadCurrentRoute();
              })
            })
          });
        })
      }
      else {
        console.log("PREENCHIDO")
      }
    })
  }

  fillTableWithList() {
    this.positionService.get().subscribe(data => {
      this.generateDummyData();
      this.jsonConverter.convertPageableToJson(data)
      this.positions = JSON.parse(this.jsonConverter.convertPageableToJson(data));
    })
  }


  deleteProduct(id: string) {
    this.productService.getById(id).subscribe(p => {
      let resp = confirm(`Deseja realmente apagar o produto ${p.name}?`)
      if (resp) {
        this.positionService.delete(id);
        this.generalService.openSnackBar(`Produto removido`,true)
        this.generalService.reloadCurrentRoute();
      }
    })
  }



}
