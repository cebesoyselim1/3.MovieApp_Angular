import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { CategoriesHomeComponent } from "./categories/categories-home/categories-home.component";
import { MoviesHomeComponent } from "./movies/movies-home/movies-home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes:Routes = [
  { path:"", redirectTo:"movies", pathMatch:"full" },
  { path:"movies", component: MoviesHomeComponent },
  { path:"categories", component: CategoriesHomeComponent },
  { path:"auth", component: AuthComponent},
  { path: "**", component: PageNotFoundComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
