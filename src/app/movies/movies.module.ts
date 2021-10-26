import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { BrowserModule } from "@angular/platform-browser";
import { CategoriesModule } from "../categories/categories.module";
import { MoviesService } from "./services/movies.service";

@NgModule({
  declarations:[
    MoviesHomeComponent,
    MoviesComponent,
    MovieComponent,
    MovieCreateComponent
  ],
  imports:[
    BrowserModule,
    HttpClientModule,
    MoviesRoutingModule,
    CategoriesModule
  ],
  exports:[
    MoviesHomeComponent,
    MoviesComponent,
    MovieComponent,
    MovieCreateComponent
  ],
  providers:[MoviesService]
})

export class MoviesModule{

}
