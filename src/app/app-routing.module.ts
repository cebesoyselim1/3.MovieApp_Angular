import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { CategoriesHomeComponent } from "./categories/categories-home/categories-home.component";

const routes:Routes = [
  { path:"", redirectTo:"movies", pathMatch:"full" },
  { path:"auth", component: AuthComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
