import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultFromEdit, UserDto } from '../../../Models/Accout/UserDto';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  private EditProfileApiUrl = environment.ProfileAPI;

  constructor(private http:HttpClient) { }

  EditProfile(edit: UserDto):Observable<ResultFromEdit>
  { 
    const url = `${this.EditProfileApiUrl}/Edit`;
      return  this.http.put<ResultFromEdit>(url,edit)
  }
 

  DeleteProfile():Observable<any>{
    const url1 = `${this.EditProfileApiUrl}/Delete`;
    return  this.http.delete<ResultFromEdit>(url1)
  }
}
