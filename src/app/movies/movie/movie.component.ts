import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  //@ts-ignore
  @Input() movieInput:Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
