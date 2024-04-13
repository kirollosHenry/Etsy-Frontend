import { CommonModule, JsonPipe, NgFor } from "@angular/common";
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
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    JsonPipe,
    TranslateModule,
    CommonModule,
  ],
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
  messageerr:string="";
  lang: string = "en";

  constructor(
    private authService: AuthService,
    private router: Router,
    private register: ResgisterService,
    public activeModal: NgbActiveModal,
    private translateService: TranslateService
  ) {} //    private modalService: NgbModal

  ngOnInit() {
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });

    this.formRegister = new FormGroup({
      emailRegister: new FormControl("", [Validators.required, Validators.email]),
      passwordRegister: new FormControl("", Validators.required),
      userNameRegister: new FormControl("", Validators.required),
    });
  }

  //Getters
  //LogIn
  get emailLogIn() {
    return this.form.get("email");
  }
  get passwordLogIn() {
    return this.form.get("password");
  }
  //Regiser :
  get emailRegisterGetter() {
    return this.formRegister.get("emailRegister");
  }
  get passwordRegisterGetter() {
    return this.formRegister.get("passwordRegister");
  }
  get userNameRegisterGetter() {
    return this.formRegister.get("userNameRegister");
  }
   errorLoginMessage:string = '';
  Login() {
    var loginRequest = <Login>{};
    loginRequest.email = this.form.controls["email"].value;
    loginRequest.password = this.form.controls["password"].value;

    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResult) => {
        if (response.isAuthenticated==true) {

          this.closeModal();
        } else if(response.isAuthenticated === false) {
          console.log(response.message);
          this.errorLoginMessage=response.message;
          this.error = "An unknown error occurred";
        }
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorLoginMessage='Invalid Email or password '
          console.log(error)
          this.error = "Invalid credentials. Please try again.";
        } else {
          this.error = "An error occurred while logging in";
        }
      }
    });
  }
 registerErrorMessage:string='';
  Register() {
    var Request = <Register>{};
    Request.Email = this.formRegister.controls["emailRegister"].value;
    Request.Password = this.formRegister.controls["passwordRegister"].value;
    Request.Username = this.formRegister.controls["userNameRegister"].value;

    this.register.login(Request).subscribe({
      next: (response: LoginResult) => {
        if (response.isAuthenticated) {
      
         this.messageerr=response.message;
         console.log(response.message);
          console.log("Token:", response.token);
          //this.router.navigate(["/Cart"]);
          // this.activeModal.dismiss('Cross click');
          this.closeModal();
          // Redirect or perform other actions here
        } else {
          console.log(response.message);
          this.error = "An unknown error occurred";
        }
      },
      error: (error) => {
        if (error.status === 400) {
          // Handle 400 Bad Request error
          this.registerErrorMessage = error.error.message;
          console.log(this.registerErrorMessage) // Access the error message from the response body
          const isAuthenticated = error.error.isAuthenticated; // Access the isAuthenticated property from the response body
          this.error = this.registerErrorMessage || "Invalid credentials. Please try again.";
          if (isAuthenticated === false) {
            this.errorLoginMessage = this.registerErrorMessage; // Show the message in your UI
          }
        } else {
          this.error = "An error occurred while logging in";
        }
      }
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
    this.activeModal.dismiss("Cross click");
  }
}
