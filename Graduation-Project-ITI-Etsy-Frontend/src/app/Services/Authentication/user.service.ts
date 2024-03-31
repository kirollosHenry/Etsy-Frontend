import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../Models/Accout/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private userDataSubject = new BehaviorSubject<UserDto>
  ({email :"not avaliable",phoneNumber:"011111111",image:"http://",userName:"not avaliable",address:"ُDefault"});
  userData$ = this.userDataSubject.asObservable();
  constructor() { }
  setUserData(userData: UserDto) {
    this.userDataSubject.next(userData);
  }
}
