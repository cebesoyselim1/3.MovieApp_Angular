import { NgModule } from "@angular/core";
import { AuthComponent } from './auth/auth.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { BrowserModule } from "@angular/platform-browser";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations:[
    AuthComponent,
    AuthHomeComponent
  ],
  imports:[
    BrowserModule,
    AuthRoutingModule
  ],
  exports:[],
  providers:[]
})

export class AuthModule{

}
