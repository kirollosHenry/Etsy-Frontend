import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,tap } from 'rxjs';
import { LoginResult } from '../../Models/Accout/login-result';
import { Register } from '../../Models/Accout/register';
import { environment } from '../../../environment/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResgisterService {

  private AccountApiUrl = environment.LocalApiAccount;

  private tokenKey: string = "token";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

 
  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  constructor(private http: HttpClient) { }



  init() : void {
    if (this.isAuthenticated())
    this.setAuthStatus(true);
     }
    login(item: Register): Observable<LoginResult> {
    const url = `${this.AccountApiUrl}/register`;
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
