import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../pages/cart/models/product';

const STORE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getProducts(limit: number = 12, sort: string = 'desc', category?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${STORE_URL}/products${category ? `/category/${category}` : ''}?limit=${limit}&sort=${sort}`);
  }


  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${STORE_URL}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${STORE_URL}/products/categories`);
  }

}
