import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/categories/models/category.model';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { ImageValidator } from '../validators/image.validator';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  private extendedMovies:ExtendedMovie[] = [];
  private categories:Category[] = [];
  errorMessage = "";
  isLoadingMode = false;
  //@ts-ignore
  selectedExtendedMovie:SpecialMovie = null;
  editMode = false;

  constructor(private moviesService:MoviesService,
              private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.isLoadingMode = true;
    this.moviesService.GetMovies().subscribe((movies) => {
      movies.forEach((movie) => {
        this.isLoadingMode = true;
        this.categoriesService.GetCategoryById(movie.categoryId).subscribe((category) => {
          const specialMovie = new ExtendedMovie(category.name,movie);
          this.extendedMovies.push(specialMovie);
          setTimeout(() => {
            this.isLoadingMode = false;
          }, 200);
        },err => {this.errorMessage = err; this.isLoadingMode = false;})
      })
    },err => {this.errorMessage = err; this.isLoadingMode = false;})

    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
    },err => {this.errorMessage = err;})

  }

  editForm = new FormGroup({
    title: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    imageUrl: new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
    category: new FormControl("",Validators.required)
  })

  GetMovies():ExtendedMovie[]{
    return this.extendedMovies;
  }

  GetCategories():Category[]{
    return this.categories;
  }

  EditMovie(extendedMovie:ExtendedMovie){
    this.selectedExtendedMovie = new ExtendedMovie(extendedMovie.categoryName, new Movie(extendedMovie.movie.id,
                                          extendedMovie.movie.title,extendedMovie.movie.description,
                                          extendedMovie.movie.publishedDate,extendedMovie.movie.imageUrl,
                                          extendedMovie.movie.categoryId));
    this.editMode = true;
  }

  CloseEdit(){
    this.selectedExtendedMovie = null;
    this.editMode = false;
  }

  SaveChanges(){
    if(this.editForm.valid){
      this.isLoadingMode = true;
      this.errorMessage = "";
      const movie = new Movie(this.selectedExtendedMovie.movie.id,this.editForm.value.title,
                              this.editForm.value.description, this.selectedExtendedMovie.movie.publishedDate,
                              this.editForm.value.imageUrl, this.editForm.value.category);
      this.moviesService.EditMovie(movie).subscribe((data) => {
        this.moviesService.GetMovies().subscribe((movies) => {
          this.extendedMovies = [];
          movies.forEach((movie) => {
            this.isLoadingMode = true;
            this.categoriesService.GetCategoryById(movie.categoryId).subscribe((category) => {
              const specialMovie = new ExtendedMovie(category.name,movie);
              this.extendedMovies.push(specialMovie);
              setTimeout(() => {
                this.isLoadingMode = false;
                this.editMode = false;
                this.selectedExtendedMovie = null;
              }, 200);
            },err => {this.errorMessage = err; this.isLoadingMode = false;})
          })
        })
      },err => {this.errorMessage = err; this.isLoadingMode = false;})

    }
  }

  DeleteMovie(extendedMovie:ExtendedMovie){
    this.errorMessage = "";
    this.isLoadingMode = true;
    this.moviesService.DeleteMovie(extendedMovie.movie).subscribe((data) => {
      this.moviesService.GetMovies().subscribe((movies) => {
        this.extendedMovies = [];
        movies.forEach((movie) => {
          this.isLoadingMode = true;
          this.categoriesService.GetCategoryById(movie.categoryId).subscribe((category) => {
            const specialMovie = new ExtendedMovie(category.name,movie);
            this.extendedMovies.push(specialMovie);
            setTimeout(() => {
              this.isLoadingMode = false;
              this.editMode = false;
              this.selectedExtendedMovie = null;
            }, 200);
          },err => {this.errorMessage = err; this.isLoadingMode = false;})
        })
      })

    },err => {this.errorMessage = err; this.isLoadingMode = false;})
  }

}

class ExtendedMovie{
  constructor(public categoryName:string,public movie:Movie){}
}
