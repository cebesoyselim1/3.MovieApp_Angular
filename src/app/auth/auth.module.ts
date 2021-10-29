import { NgModule } from "@angular/core";
import { AuthComponent } from './auth/auth.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { BrowserModule } from "@angular/platform-browser";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./services/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthErrorInterceptor } from "./interceptors/authError.interceptor";

@NgModule({
  declarations:[
    AuthComponent,
    AuthHomeComponent
  ],
  imports:[
    BrowserModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[],
  providers:[
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true}
  ]
})

export class AuthModule{

}
