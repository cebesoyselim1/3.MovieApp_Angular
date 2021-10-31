import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieEditComponent } from "./movie-edit/movie-edit.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies/movies.component";

const routes:Routes = [
  { path: "movies", component: MoviesHomeComponent, canActivate: [AuthGuard], children: [
    { path: "", component: MoviesComponent },
    { path: "create", component: MovieCreateComponent },
    { path: "edit", component: MovieEditComponent },
    { path: ":movieId", component: MovieDetailsComponent },
    { path: "category/:categoryId", component: MoviesComponent }
  ]},
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class MoviesRoutingModule{

}
