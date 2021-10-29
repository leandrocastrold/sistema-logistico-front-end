import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8080/api/v1/products";

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  create(product:Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  save(id:string, product:Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id:string) {
    this.http.delete(`${this.baseUrl}/${id}/remocao`).subscribe (p => {
      console.log(`${this.baseUrl}/${id}/remocao`)
    })
  }

}
