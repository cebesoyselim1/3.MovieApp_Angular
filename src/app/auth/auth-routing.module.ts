import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthHomeComponent } from "./auth-home/auth-home.component";
import { AuthComponent } from "./auth/auth.component";

const routes:Routes = [
  { path:"auth", component:AuthHomeComponent, children:[
    { path: "", component: AuthComponent }
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class AuthRoutingModule{

}
