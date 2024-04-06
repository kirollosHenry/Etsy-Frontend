import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,tap } from 'rxjs';
import { LoginResult } from '../../Models/Accout/login-result';
import { Register } from '../../Models/Accout/register';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ResgisterService {

  private AccountApiUrl = environment.AccountApiUrl;

  private tokenKey: string = "token";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();
  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  //private baseUrl: string ="http://localhost:5104"
  constructor(private http: HttpClient) { }

 /*  login(login1 : Login) :Observable<LoginResult> {
    const url = `${this.baseUrl}/api/Account/Login`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResult>(url, login1,{headers});
  } */

  init() : void {
    if (this.isAuthenticated())
    this.setAuthStatus(true);
     }
    login(item: Register): Observable<LoginResult> {
    var url = `${this.AccountApiUrl}/register`;
    return this.http.post<LoginResult>(url, item)
         .pipe(tap(loginResult => {
    if (loginResult.isAuthenticated && loginResult.token) {
    localStorage.setItem(this.tokenKey, loginResult.token);
    this.setAuthStatus(true);
           }
         }));
     }


     
    logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
     }


    private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
     }


}
