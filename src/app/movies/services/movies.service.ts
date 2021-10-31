import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../models/movie.model";

@Injectable()

export class MoviesService{

  private url_firebase = "https://movieapp-61f41-default-rtdb.firebaseio.com/movies";

  constructor(private http:HttpClient){}

  GetMovies(categoryId?:string):Observable<Movie[]>{
    const newUrl = `${this.url_firebase}.json`;
    return this.http.get<Movie[]>(newUrl).pipe(
      map((datas) => {
        let movies:Movie[] = [];

        for(let key in datas){
          datas[key].id = key;
          if(categoryId){
            if(datas[key].categoryId == categoryId){ movies.push(datas[key]); }
          }else{
            movies.push(datas[key]);
          }
        }

        return movies;
      })
    )
  }

  GetMovieById(movieId:string):Observable<Movie>{
    const newUrl = `${this.url_firebase}/${movieId}.json`;
    return this.http.get<Movie>(newUrl).pipe(
      map((data) => {
        const movie = new Movie(movieId,data.title,data.description,
                                data.publishedDate,data.imageUrl,
                                data.categoryId);
        return movie;
      })
    )
  }

  AddMovie(movie:Movie):Observable<Movie>{
    const newUrl = `${this.url_firebase}.json`;
    return this.http.post<Movie>(newUrl,movie).pipe(
      map((data) => {
        return movie;
      })
    )
  }

  EditMovie(movie:Movie):Observable<Movie>{
    const newUrl = `${this.url_firebase}/${movie.id}.json`;
    return this.http.put(newUrl,movie).pipe(
      map((data) => {
        return movie;
      })
    )
  }

  DeleteMovie(movie:Movie):Observable<Movie>{
    const newUrl = `${this.url_firebase}/${movie.id}.json`;
    return this.http.delete(newUrl).pipe(
      map((data) => {
        return movie;
      })
    )
  }

}
