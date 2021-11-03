import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Movie } from '../models/movie.model';
import { UserMovieList } from '../models/usermovielist.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  //@ts-ignore
  @Input() movieInput:Movie;
  isLoadingMode = false;
  errorMessage = "";
  movieList:string[] = [];

  constructor(private authService:AuthService,
              private moviesService:MoviesService,
              private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.moviesService.GetFromList(user.id).subscribe((movieList) => {
        this.movieList = movieList;
      })
    })
  }

  ToggleList(toggleBtn:HTMLButtonElement, movie:Movie){
    if(toggleBtn.innerHTML == "Add to List"){
      toggleBtn.classList.add("disabled");
      this.authService.user.subscribe((user) => {
        const userMovieList = new UserMovieList(user.id,movie.id);
        this.moviesService.AddToList(userMovieList).subscribe((data) => {
          toggleBtn.classList.remove("btn-outline-success");
          toggleBtn.classList.add("btn-outline-danger");
          toggleBtn.innerHTML = "Delete from List";
          toggleBtn.classList.remove("disabled");
          this.alertifyService.success("Movie has successfully added to the list.");
        },err => {this.errorMessage = err})
      })
    }else{
      toggleBtn.classList.add("disabled");
      this.authService.user.subscribe((user) => {
        const userMovieList = new UserMovieList(user.id,movie.id);
        this.moviesService.RemoveFromList(userMovieList).subscribe((data) => {
          toggleBtn.classList.remove("btn-outline-danger");
          toggleBtn.classList.add("btn-outline-success");
          toggleBtn.innerHTML = "Add to List";
          toggleBtn.classList.remove("disabled");
          this.alertifyService.error("Movie has successfully removed from the list.");
        },err => {this.errorMessage = err;})
      })
    }
  }

  CheckList(movie:Movie){
    if(this.movieList.includes(movie.id)){
      return true;
    }
    return false;
  }

}
