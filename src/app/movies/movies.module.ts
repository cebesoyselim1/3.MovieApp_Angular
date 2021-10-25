import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';

@NgModule({
  declarations:[
    MoviesHomeComponent,
    MoviesComponent,
    MovieComponent,
    MovieCreateComponent
  ],
  imports:[
    HttpClientModule,
    MoviesRoutingModule
  ],
  exports:[
    MoviesHomeComponent,
    MoviesComponent
  ],
  providers:[]
})

export class MoviesModule{

}
