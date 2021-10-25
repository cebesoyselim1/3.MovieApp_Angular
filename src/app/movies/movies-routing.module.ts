import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies/movies.component";

const routes:Routes = [
  { path: "movies", component: MoviesHomeComponent, children: [
    { path: "", component: MoviesComponent }
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class MoviesRoutingModule{

}
