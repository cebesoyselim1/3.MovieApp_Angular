import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestModel } from '../models/request.model';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private currentSign = "Sign In";
  errorMessage = "";

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  ToggleSign(btnSign:HTMLButtonElement,btnSubmit:HTMLButtonElement){
    if(btnSubmit.innerHTML == "Sign In"){
      btnSubmit.innerHTML = "Sign Up";
      btnSign.innerHTML = "Toggle to Sign In";
      btnSubmit.classList.remove("btn-outline-success");
      btnSubmit.classList.add("btn-outline-warning");

      this.currentSign = "Sign Up";
    }else{
      btnSubmit.innerHTML = "Sign In";
      btnSign.innerHTML = "Toggle to Sign Up";
      btnSubmit.classList.remove("btn-outline-warning");
      btnSubmit.classList.add("btn-outline-success");

      this.currentSign = "Sign Up";
    }
  }

  authForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)])
  })

  AuthCheck(){
    this.errorMessage = "";
    if(this.authForm.valid){
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      const requestModel = new RequestModel(email,password,true);

      if(this.currentSign == "Sign In"){
        this.authService.SignIn(requestModel).subscribe((response) => {
          const user = new UserModel(response.localId,response.email,
                                    new Date(new Date().getTime() + Number(response.expiresIn) * 1000),response.idToken);
          this.authService.SaveTokenLS(user);
          this.authService.user.next(user);
          this.router.navigate(["/movies"]);
        },err => this.errorMessage = err)
      }else{
        this.authService.SignUp(requestModel).subscribe((response) => {
          const user = new UserModel(response.localId,response.email,
                                    new Date(new Date().getTime() + Number(response.expiresIn) * 1000),response.idToken);
          this.authService.SaveTokenLS(user);
          this.authService.user.next(user);
          this.router.navigate(["/movies"]);
        },err => this.errorMessage = err)
      }
    }
  }

}
