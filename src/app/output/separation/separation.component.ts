import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from 'src/app/orders/order';
import { OrderService } from 'src/app/orders/order.service';
import { Separation } from 'src/app/orders/separation';
import { PositionService } from 'src/app/position-product/position.service';
import { Product } from 'src/app/products/product';
import { GeneralService } from 'src/app/shared/general.service';
import { JsonConverterService } from 'src/app/shared/json-converter.service';

@Component({
  selector: 'app-separation',
  templateUrl: './separation.component.html',
  styleUrls: ['./separation.component.scss']
})
export class SeparationComponent implements OnInit {

  separations?: Separation[];
  isEmpty: boolean = true;

  constructor(private jsonConverter: JsonConverterService,
    private orderService: OrderService,
    private positionService: PositionService,
    private generalService: GeneralService) { }


  ngOnInit(): void {
    this.orderService.get().subscribe(s => {
      this.separations = JSON.parse(this.jsonConverter.convertPageableToJson(s));
      this.separations?.forEach(s => {
        if (s.status == 'INICIADO') {
          this.isEmpty = false;
        }
      })
    })
  }

  changeStatus(id: number, status: string) {
    this.orderService.changeStatus(id, status);
  }


  cancelSeparation(separationId: number) {
    this.orderService.cancelSeparation(separationId)

  }

  //Métodos abaixo usados apenas para simular pedido
  generateOrder(productId: string, productAmount: number): Observable<Order> {
    let newProduct: Product;
    let amount: number;
    let price: number;
    let newOrder: Order;
    let subject = new Subject<Order>();
    this.positionService.findPositionByProductId(productId).subscribe(p => {
      newProduct = p.product;
      amount = productAmount;
      price = newProduct.price * amount;
      newOrder = { product: newProduct, quantity: amount, totalPrice: price }
      this.positionService.confirmOrder(p.id!, amount);
      console.log(newOrder);
      subject.next(newOrder)
    })
    return subject.asObservable();
  }

  generateSeparation() {
    let orders: Order[] = [];
    this.generateOrder("1", 20).subscribe(o => {
      orders.push(o);
      this.generateOrder("2", 40).subscribe(o => {
        orders.push(o);
        this.generateOrder("3", 40).subscribe(o => {
          orders.push(o);
          this.orderService.generateSeparation(orders).subscribe(s => {
            this.separations = [];
            this.separations?.push(s);
            console.log(this.separations)
            this.generalService.reloadCurrentRoute();
          });
        });
      });
    })
  }

}
