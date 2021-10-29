import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RequestModel } from "../models/request.model";
import { ResponseModel } from "../models/response.model";
import { UserModel } from "../models/user.model";


@Injectable()

export class AuthService{

  private api_key = "AIzaSyA1MABKyc9IHrRXVFp3eXEebUiJYi1oS2M";
  private url_signUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private url_signIn = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  //@ts-ignore
  user:BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http:HttpClient){}

  SignUp(req:RequestModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.url_signUp + this.api_key,req);
  }

  SignIn(req:RequestModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.url_signIn + this.api_key,req);
  }

  SaveTokenLS(user:UserModel){
    localStorage.setItem("auth",JSON.stringify(user));
  }

  Authentication(){
    //@ts-ignore
    let userLS = JSON.parse(localStorage.getItem("auth"));
    if(userLS){
      let user = new UserModel(userLS.id,userLS.email,
                              new Date(userLS.expiresDate),
                              userLS._token);
      this.user.next(user);
    }
  }
}
