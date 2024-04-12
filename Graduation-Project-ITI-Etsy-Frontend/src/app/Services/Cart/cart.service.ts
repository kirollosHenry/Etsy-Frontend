import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AddCartDTO, ICartAPI } from '../../Models/cart';
import { Observable, tap } from 'rxjs';
import { BadgeCartService } from './badge-cart.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiCartURL = environment.CartApiUrl;
  constructor(private _HttpClient : HttpClient , private BadgeCartService:BadgeCartService) { }

  AddToCart(CartObj : AddCartDTO) : Observable<AddCartDTO>{
    return this._HttpClient.post<AddCartDTO>(this.apiCartURL, CartObj);
  }

  GetAllCarts(CustomerId : string) : Observable<ICartAPI>{
    return this._HttpClient.get<ICartAPI>(`${this.apiCartURL}/${CustomerId}`).pipe(
      tap((response: ICartAPI) => {
        this.BadgeCartService.updateCartCount(response.count);
      })
    );
  }

  DeleteCart(CustomerId : string) : Observable<ICartAPI>{
    return this._HttpClient.delete<ICartAPI>(`${this.apiCartURL}/Delete/${CustomerId}`);
  }

  DeleteCartById(CartId : number) : Observable<ICartAPI>{
    return this._HttpClient.delete<ICartAPI>(`${this.apiCartURL}/DeleteCartId/${CartId}`);
  }
}
