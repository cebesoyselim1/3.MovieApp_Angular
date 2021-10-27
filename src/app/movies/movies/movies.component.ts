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

  constructor(private moviesService:MoviesService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((route) => {
      if(route.categoryId){
        this.moviesService.GetMovies(route.categoryId).subscribe((movies) => {
          this.movies = movies;
        })
      }else{
        this.moviesService.GetMovies().subscribe((movies) => {
          this.movies = movies;
        })
      }
    })
  }

  GetMovies():Movie[]{
    return this.movies;
  }

}
