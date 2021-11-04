import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../auth/guards/admin.guard";
import { AuthGuard } from "../auth/guards/auth.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieEditComponent } from "./movie-edit/movie-edit.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies/movies.component";

const routes:Routes = [
  { path: "movies", component: MoviesHomeComponent, canActivate: [AuthGuard], children: [
    { path: "", component: MoviesComponent },
    { path: "create", component: MovieCreateComponent, canActivate:[AdminGuard] },
    { path: "edit", component: MovieEditComponent, canActivate:[AdminGuard] },
    { path: ":movieId", component: MovieDetailsComponent },
    { path: "category/:categoryId", component: MoviesComponent },
    { path: "**", component: PageNotFoundComponent }
  ]},
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class MoviesRoutingModule{

}
