import { Component, OnInit } from '@angular/core';
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

  constructor(private moviesService:MoviesService) { }

  ngOnInit(): void {
    this.moviesService.GetMovies().subscribe((movies) => {
      this.movies = movies;
    })
  }

  GetMovies():Movie[]{
    return this.movies;
  }

}
