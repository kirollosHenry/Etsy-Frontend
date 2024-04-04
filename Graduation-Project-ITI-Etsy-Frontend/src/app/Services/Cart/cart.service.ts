import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AddCartDTO, ICartAPI } from '../../Models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiCartURL = environment.CartApiUrl;
  constructor(private _HttpClient : HttpClient) { }

  AddToCart(CartObj : AddCartDTO) : Observable<AddCartDTO>{
    return this._HttpClient.post<AddCartDTO>(this.apiCartURL, CartObj);
  }

  GetAllCarts(CustomerId : string) : Observable<ICartAPI>{
    return this._HttpClient.get<ICartAPI>(`${this.apiCartURL}/${CustomerId}`);
  }

  DeleteCart(CustomerId : string) : Observable<ICartAPI>{
    return this._HttpClient.get<ICartAPI>(`${this.apiCartURL}/Delete/${CustomerId}`);
  }
}
