import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/categories/models/category.model';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { ImageValidator } from '../validators/image.validator';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  private categories:Category[] = [];
  errorMessage = "";

  constructor(private moviesService:MoviesService,
              private categoriesService:CategoriesService,
              private router:Router) { }

  ngOnInit(): void {
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
    },err => this.errorMessage = err)
  }

  movieForm = new FormGroup({
    title: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    imageUrl: new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
    categoryId: new FormControl("",[Validators.required])
  })

  CreateMovie(){
    if(this.movieForm.valid){
      const movie = new Movie("",this.movieForm.value.title,
                              this.movieForm.value.description,
                              new Date().getTime().toString(),
                              this.movieForm.value.imageUrl,
                              this.movieForm.value.categoryId);

      this.moviesService.AddMovie(movie).subscribe((data) => {
        console.log(`${data} has been created.`);
        this.router.navigate(["/movies"]);
      },err => this.errorMessage = err)
    }
  }

  GetCategories():Category[]{
    return this.categories;
  }

}
