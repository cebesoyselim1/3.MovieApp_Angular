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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SummaryPipe } from "./pipes/summary.pipe";
import { SearchPipe } from "./pipes/search.pipe";
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from "../shared/shared.module";
import { MovieEditComponent } from './movie-edit/movie-edit.component';

@NgModule({
  declarations:[
    MoviesHomeComponent,
    MoviesComponent,
    MovieComponent,
    MovieCreateComponent,
    SummaryPipe,
    SearchPipe,
    MovieDetailsComponent,
    MovieEditComponent
  ],
  imports:[
    BrowserModule,
    HttpClientModule,
    MoviesRoutingModule,
    CategoriesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
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
