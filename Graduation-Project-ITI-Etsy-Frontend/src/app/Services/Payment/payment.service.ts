import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../../Models/payment';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiPaymentURL = environment.OrderApiUrl;

  constructor(private _HttpClient:HttpClient) { }


  CreatePayment(PaymentObj: Payment): Observable<Payment> {
    return this._HttpClient.post<Payment>(this.apiPaymentURL, PaymentObj);
  }
}
