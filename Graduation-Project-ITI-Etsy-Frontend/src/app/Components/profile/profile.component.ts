import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/Authentication/user.service';
import { UserDto } from '../../Models/Accout/UserDto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  editing:boolean =false;
   userData!: UserDto;
  email:string = "";
  userForm!: FormGroup;
   editProfile() {
    this.editing = !this.editing;
  }
  saveProfile() {
    // You can add logic here to save the updated profile data
    this.editing = false;
  }
  constructor(private user:UserService ,private fb: FormBuilder ,private router:Router){}
  ngOnInit(): void {
    this.user.userData$.subscribe(userData => {
      this.userData = userData;
    });
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    
  }

  onSubmit() {
    // Logic to handle form submission
    console.log(this.userForm.value);
  }

}
