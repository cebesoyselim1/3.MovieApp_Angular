import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {

  errorMessage = "";
  isLoadingMode = false;

  constructor(private categoriesSerive:CategoriesService,
              private router:Router) { }

  categoryForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.maxLength(30)])
  })

  CreateCategory():void{
    this.errorMessage = "";

    if(this.categoryForm.valid){
      this.isLoadingMode = true;
      const category = new Category("",this.categoryForm.value.name);

      this.categoriesSerive.AddCategory(category).subscribe((data) => {
        this.isLoadingMode = false;
        this.router.navigate(["/movies"]);
      },err => {this.errorMessage = err; this.isLoadingMode = false;})
    }
  }

}
