import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  //@ts-ignore
  private movie:Movie = null;

  constructor(private moviesSerive:MoviesService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((route) => {
      if(route.movieId){
        this.moviesSerive.GetMovieById(route.movieId).subscribe((movie) => {
          this.movie = movie;
        })
      }
    })
  }

  GetMovie():Movie{
    return this.movie;
  }

}
