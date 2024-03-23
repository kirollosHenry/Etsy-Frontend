import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { IProductAPI } from '../../Models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiProductURL = environment.ProductApiUrl;
  constructor(private _HttpClient: HttpClient) { }

  GetAllProductsPagination(items: number, page: number): Observable<IProductAPI> {
    return this._HttpClient.get<IProductAPI>(`${this.apiProductURL}/${items},${page}`)
  }

  GetOneProductByID(ProductID: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.apiProductURL}/${ProductID}`)
  }

  FilterProducts(MinPrice: number, MaxPrice: number, CategoryId: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.apiProductURL}/Filter/${MinPrice},${MaxPrice},${CategoryId}`)
  }
}
