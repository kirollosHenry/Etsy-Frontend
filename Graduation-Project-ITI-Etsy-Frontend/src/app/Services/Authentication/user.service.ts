import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../Models/Accout/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<UserDto>
  ({email :"User@example.com",phoneNumber:"012776432995",image:"Heelo.png",userName:"john Smith",address:"Cairo"});
  userData$ = this.userDataSubject.asObservable();
  constructor() { }
  setUserData(userData: UserDto) {
    this.userDataSubject.next(userData);
  }
}
