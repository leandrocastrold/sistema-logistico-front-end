import { HttpClient } from '@angular/common/http';
import { Position } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../products/product';
import { GeneralService } from '../shared/general.service';
import { ProdPosition } from './position';



@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient, private generalService: GeneralService) {

  }
  baseUrl: string = " http://localhost:8080/api/v1/inventory-positions";
  position?: ProdPosition

  get(): Observable<ProdPosition[]> {
    return this.http.get<ProdPosition[]>(this.baseUrl)
  }

  getById(id: string): Observable<ProdPosition> {
    return this.http.get<ProdPosition>(this.baseUrl + "/" + id);
  }

  create(produto: Product): Observable<Position> {
    this.position = { product: produto, availableQuantity: 0, reserveQuantity: 0 };
    return this.http.post<Position>(this.baseUrl, this.position)
  }

  findPositionByProductId(id: string): Observable<ProdPosition> {
    return this.http.get<ProdPosition>(`${this.baseUrl}/product/${id}`)
  }

  patch(positionId: number, amount: string): Observable<Position> {
    let newAmount = Number(amount);
    return this.http.patch<Position>(`${this.baseUrl}/${positionId}/quantity/`, { availableQuantity: newAmount })
  }

  delete(id: string) {
    this.http.delete(`${this.baseUrl}/${id}/remocao`).subscribe(p => {
      console.log("Produto apagado com sucesso!")
    })
  }

  removeFromReserve(positionId: number, quantity: number) {
    this.getById(positionId.toString()).subscribe(pos => {
      pos.reserveQuantity -= quantity;
      this.http.put(`${this.baseUrl}/${positionId}`, pos).subscribe(() => {
        console.log(`Removido ${quantity} da reserva da posição ${positionId}`)
      })
    })
  }

  confirmOrder(positionId: number, quantity: number) {
    this.getById(positionId.toString()).subscribe(pos => {
      pos.availableQuantity -= quantity;
      pos.reserveQuantity += quantity;
      this.http.put(`${this.baseUrl}/${positionId}`, pos).subscribe(() => {
        console.log("Pedido confirmado. Estoque atualizado")
        this.generalService.reloadCurrentRoute();
      })
    })
  }

  cancelOrder(positionId: number, quantity: number) {
    console.log(`position: ${positionId}`)
    this.getById(positionId.toString()).subscribe(pos => {
      pos.availableQuantity += quantity;
      pos.reserveQuantity -= quantity;
      this.http.put(`${this.baseUrl}/${positionId}`, pos).subscribe(() => {
        this.generalService.openSnackBar("Pedido cancelado.",true)
        this.generalService.reloadCurrentRoute();
      })
    })
  }
}
