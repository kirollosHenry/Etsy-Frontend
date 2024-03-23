import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiProductURL = environment.ProductApiUrl;
  constructor(private _HttpClient : HttpClient) { }

  GetAllProductsPagination(items:number , page:number ):Observable<any[]>
  {
    return this._HttpClient.get<any[]>(`${this.apiProductURL}/${items},${page}`) 
  }
}
