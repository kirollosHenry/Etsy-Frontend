import { JsonPipe, NgFor } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../Services/Authentication/auth.service";
import { Login } from "../../Models/Accout/login";
import { LoginResult } from "../../Models/Accout/login-result";
import { ResgisterService } from "../../Services/Authentication/resgister.service";
import { Register } from "../../Models/Accout/register";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, JsonPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  error!: string;
  form!: FormGroup;
  formRegister!: FormGroup;
  activatedRoute: any;
  showRegistrationForm: boolean = false;
  emailRegister: string = "";
  userNameRegister: string = "";
  passwordRegister: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private register: ResgisterService,
    public activeModal: NgbActiveModal
  ) {} //    private modalService: NgbModal

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.formRegister = new FormGroup({
      emailRegister: new FormControl("", Validators.required),
      passwordRegister: new FormControl("", Validators.required),
      userNameRegister: new FormControl("", Validators.required),
    });
  }

  Login() {
    var loginRequest = <Login>{};
    loginRequest.email = this.form.controls["email"].value;
    loginRequest.password = this.form.controls["password"].value;

    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResult) => {
        if (response.isAuthenticated) {
          // Handle successful authentication
<<<<<<< HEAD
          console.log('Login successful');
          console.log('Token:',response.token);
          if (response.customer) {
            console.log('Email:', response.customer.email);
          } else {
            console.log('Customer data not found in response');
          }
          this.router.navigate(['/Category']);
          // Redirect or perform other actions here
        } else {
          
          this.error =  'An unknown error occurred';
=======
          console.log("Login successful");
          console.log("Token:", response.token);

          this.router.navigate(["/Category"]);
          // Redirect or perform other actions here
        } else {
          this.error = "An unknown error occurred";
>>>>>>> 3fd711c251abf782114bc0c7d5f893b04a306dc9
        }
      },
      error: (error) => {
        this.error = "An error occurred while logging in";
      },
    });
  }

  Register() {
    var Request = <Register>{};
    Request.Email = this.formRegister.controls["emailRegister"].value;
    Request.Password = this.formRegister.controls["passwordRegister"].value;
    Request.Username = this.formRegister.controls["userNameRegister"].value;

    this.register.login(Request).subscribe({
      next: (response: LoginResult) => {
        if (response.isAuthenticated) {
          // Handle successful authentication
          console.log("Login successful");
          console.log("Token:", response.token);

          this.router.navigate(["/Category"]);
          // Redirect or perform other actions here
        } else {
          this.error = "An unknown error occurred";
        }
      },
      error: (error) => {
        this.error = "An error occurred while logging in";
      },
    });
  }

  toggleForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
  }

  // ttt

  @ViewChild("loginFormContent") loginFormContent!: ElementRef;
  // modalRef!: NgbModalRef;

  // openLoginModal(): void {
  //   this.modalRef = this.modalService.open(this.loginFormContent, { ariaLabelledBy: 'modal-basic-title' });
  // }

  // closeModal(): void {
  //   if (this.modalRef) {
  //     this.modalRef.close('Close button clicked');
  //   }
  // }

  // dismissModal(): void {
  //   if (this.modalRef) {
  //     this.modalRef.dismiss('Dismiss button clicked');
  //   }
  // }


  // Modal !!
  

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
}
