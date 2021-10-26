import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "../models/movie.model";

@Pipe({ name:"search" })

export class SearchPipe implements PipeTransform{
  transform(value: any, searchedText?:string) {
    let movies = value as Movie[];

    if(!movies) return [];
    if(!searchedText) return movies;

    return movies.filter((movie) => movie.title.trim().toLowerCase().includes(searchedText.trim().toLowerCase()))
  }

}
