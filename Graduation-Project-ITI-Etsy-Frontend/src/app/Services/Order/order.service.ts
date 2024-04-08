import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { IOrderAPI, Order } from '../../Models/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiOrderURL = environment.OrderApiUrl;

  constructor(private _HttpClient: HttpClient) { }

  GetOrderById(OrderId: number): Observable<IOrderAPI> {
    return this._HttpClient.get<IOrderAPI>(`${this.apiOrderURL} / ${OrderId}`)
  }

  DeleteOrderById(OrderId: number): Observable<IOrderAPI> {
    return this._HttpClient.delete<IOrderAPI>(`${this.apiOrderURL} / ${OrderId}`)
  }

  CreateOrder(OrderObject: Order): Observable<Order> {
    return this._HttpClient.post<Order>(this.apiOrderURL, OrderObject)
  }

  UpdateOrder(OrderObject: Order): Observable<Order> {
    return this._HttpClient.put<Order>(this.apiOrderURL, OrderObject)
  }

  GetAllOrdersByCustomerId(customerId: string): Observable<IOrderAPI> {
    return this._HttpClient.get<IOrderAPI>(`${this.apiOrderURL}/Orders/ ${customerId}`)
  }
}

