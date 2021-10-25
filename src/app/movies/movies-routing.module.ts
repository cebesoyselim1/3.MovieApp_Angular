import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies/movies.component";

const routes:Routes = [
  { path: "movies", component: MoviesHomeComponent, children: [
    { path: "", component: MoviesComponent },
    { path: "create", component: MovieCreateComponent }
  ]},

]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class MoviesRoutingModule{

}
