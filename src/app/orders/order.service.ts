import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PositionService } from '../position-product/position.service';
import { GeneralService } from '../shared/general.service';
import { Order } from './order';
import { Separation } from './separation';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  baseUrl = "http://localhost:8080/api/v1/separacoes"
  constructor(private http: HttpClient,
              private positionService: PositionService,
              private generalService: GeneralService) { }
  
  get() : Observable<Separation[]> {
   return this.http.get<Separation[]>(this.baseUrl);
  }

  getById(id: string) : Observable<Separation> {
    return this.http.get<Separation>(`${this.baseUrl}/${id}`);
   }

  changeStatus (separationId: number, newStatus:string) {
   this.getById(separationId.toString()).subscribe(s => {
     this.http.patch(`${this.baseUrl}/${separationId}`, {status:newStatus}).subscribe(s => {
      this.generalService.openSnackBar("Status do pedido alterado", true)
       this.generalService.reloadCurrentRoute();
     })
   })
  }

  delete(separationId: number) {
    this.http.delete<Separation>(`${this.baseUrl}/${separationId}`).subscribe(d => {
      console.log("Deletado");
      this.generalService.reloadCurrentRoute();
    });
  }

  generateSeparation(orders: Order[]): Observable<Separation> {
    let finalPrice = 0;
    for (let p of orders) {
      finalPrice += p.totalPrice;
    }    

    let newSeparation: Separation = {
      orderItems: orders,
      totalPrice: finalPrice,
      status: "INICIADO"
    };
    console.log(newSeparation)
    return this.http.post<Separation>(this.baseUrl, newSeparation);
  }

  cancelSeparation(separationId: number) {
  this.getById(separationId.toString()).subscribe (s => {
  for (let order of s.orderItems){
    this.positionService.findPositionByProductId(order.product.id!.toString()).subscribe(p => {
      this.positionService.cancelOrder(p.id!, order.quantity)
    });

  }
  this.changeStatus(separationId, "CANCELADO");
  console.log(`${this.baseUrl}/${separationId}`);
  this.http.put<Separation>(`${this.baseUrl}/${separationId}`, s).subscribe (()=>{
  });
  })
  }

}
