import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies:Movie[] = [];
  searchedText:string = "";
  isLoadingMode = false;
  errorMessage = "";

  constructor(private moviesService:MoviesService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((route) => {
      this.isLoadingMode = true;
      this.movies = [];
      if(route.categoryId){
        this.moviesService.GetMovies(route.categoryId).subscribe((movies) => {
          this.movies = movies;
          this.isLoadingMode = false;
        },err => { this.errorMessage = err; this.isLoadingMode = false})
      }else{
        this.moviesService.GetMovies().subscribe((movies) => {
          this.movies = movies;
          this.isLoadingMode = false;
        },err => { this.errorMessage = err; this.isLoadingMode = false})
      }
    })
  }

  GetMovies():Movie[]{
    return this.movies;
  }

}
