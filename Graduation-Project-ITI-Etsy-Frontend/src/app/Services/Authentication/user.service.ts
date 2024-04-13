import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../Models/Accout/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('userData')|| 'null') || { email: '', phoneNumber: '', image: '', userName: '', address: '' });;
  userData$ = this.userDataSubject.asObservable();
  constructor() { }
  setUserData(userData: UserDto) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }
}
