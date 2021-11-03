import { NgModule, OnInit } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

const routes:Routes = [
  { path:"", redirectTo:"movies", pathMatch:"full" },
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule implements OnInit{

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.Authentication();
  }


}
