import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryAPI, IOneCategoryAPI } from '../../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private categoryApiUrl = environment.CategoryApiUrl;
  constructor(private _HttpClient : HttpClient) { }

  GetAllCategories():Observable<ICategoryAPI>
  {
    return this._HttpClient.get<ICategoryAPI>(`${this.categoryApiUrl}/Get`)
  }

  GetAllCategoriesByBaseCategoryId(id:number):Observable<ICategoryAPI>
  {
    return this._HttpClient.get<ICategoryAPI>(`${this.categoryApiUrl}/${id}`)
  }

  GatCategoriesByName(CategoryName : string) : Observable<IOneCategoryAPI>
  {
    return this._HttpClient.get<IOneCategoryAPI>(`${this.categoryApiUrl}/SearchCategory?name=${CategoryName}`)
  }

}
