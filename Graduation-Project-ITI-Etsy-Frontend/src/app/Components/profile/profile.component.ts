import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Services/Authentication/user.service';
import { UserDto } from '../../Models/Accout/UserDto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EditProfileService } from '../../Services/Authentication/Profile/edit-profile.service';
import { Subscription} from 'rxjs';
import { NotExpr } from '@angular/compiler';
import { OrderService } from '../../Services/Order/order.service';
import { IOrderAPI, Order } from '../../Models/order';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit ,OnDestroy{
  editing:boolean =false;
   userData!: UserDto;
   userForm!: FormGroup;
  
  
   editProfile() {
    this.editing = !this.editing;
  }

  sub!:Subscription;
  CustomerId!:string;
  // CustomerId: string = "913c9e97-3462-4385-a981-95fec22b9fdc";
  
  
  OrdersList!:Order[];

  constructor(private user:UserService ,private fb: FormBuilder ,
    private router:Router, private edit :EditProfileService,
    private OrderService:OrderService
  ){}
 
  ngOnInit(): void {
    this.user.userData$.subscribe(userData => {
      this.userData = userData;
    });
    this.userForm = this.fb.group({
      Image:['image', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['',Validators.required]
    });
   
   //GetAllOrdersByCustomerId
   this.sub = this.OrderService.GetAllOrdersByCustomerId(this.CustomerId).subscribe({
    next: (OrderAPI: IOrderAPI) => {
      // debugger;
      console.log(OrderAPI);
      
      this.OrdersList = OrderAPI.order.entities;
    },
    error: (error)=>{
      console.log("Error: ",error);
      
    }
   })
  }
  

  nmessage:string = '';

  onSubmit(){
    
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.userData.userName = formData.username;
      this.userData.email = formData.email;
      this.userData.address = formData.address;
      this.userData.phoneNumber = formData.phone;

      this.userData.image = "sadasasx.jpg";
      console.log(formData);
      this.sub = this.edit.EditProfile(this.userData).subscribe({
        next: (res) => {
          console.log(formData);
          console.log(res.message);
        }
      });

      console.log(formData);
    } else {
      console.log('Form is invalid');
    }
  }
  delete(){
    this.sub = this.edit.DeleteProfile().subscribe({
      next:(res) => {
        console.log(res.message);
      }

    })

}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
 
}
