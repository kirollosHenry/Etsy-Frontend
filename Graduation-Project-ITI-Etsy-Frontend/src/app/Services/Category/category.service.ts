import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryAPI } from '../../Models/category';

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
}
