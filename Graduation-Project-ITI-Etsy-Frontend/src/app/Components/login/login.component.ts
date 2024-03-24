import { JsonPipe, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-login",
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, JsonPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  email: string="";
  password: string="";
  error!: string;
  form!:FormGroup
  activatedRoute: any;
  
 
  constructor(private authService: AuthService, private router:Router ) { }
  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    var loginRequest = <Login>{};
    loginRequest.email = this.form.controls['email'].value;
    loginRequest.password = this.form.controls['password'].value;

    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResult) => {
        if (response.isAuthenticated) {
          // Handle successful authentication
          console.log('Login successful');
          console.log('Token:',response.token);
          
          this.router.navigate(['/Category']);
          // Redirect or perform other actions here
        } else {
          this.error =  'An unknown error occurred';
        }
      },
      error: error => {
        this.error = 'An error occurred while logging in';
      }
    });   
  }

  /* email!: string;
  password!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {} */

  /* profileForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: [""],
  });

  login!: Login;
  onSubmit() {
    this.authService.login(this.login).subscribe({
      next: (response) => {
        if (response.IsAuthenticated) {
          console.log(response.message);
        } else {
          console.log("enail or password is wrong try again");
        }
      },
    });
  } */
}
