import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseCategoryAPI } from '../../Models/base-category';

@Injectable({
  providedIn: 'root'
})
export class BaseCategoryService {

  private baseCategoryApiUrl = environment.BaseCategoryApiUrl;
  constructor(private _HttpClient: HttpClient) { }

  GatAllBaseCategories() : Observable<IBaseCategoryAPI>
  {
    return this._HttpClient.get<IBaseCategoryAPI>(`${this.baseCategoryApiUrl}/GetAll`)
  }
}
