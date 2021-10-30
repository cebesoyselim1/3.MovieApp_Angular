import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  private categories:Category[] = [];
  errorMessage = "";
  editMode = false;
  //@ts-ignore
  selectedCategory:Category = null;
  isLoadingMode = false;

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.isLoadingMode = true;
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
      this.isLoadingMode = false;
    },err => {this.errorMessage = err; this.isLoadingMode = false;});
  }

  GetCategories():Category[]{
    return this.categories;
  }

  EditCategory(category:Category){
    this.selectedCategory = new Category(category.id,category.name);
    this.editMode = true;
  }

  CloseEdit(){
    this.editMode = false;
    //@ts-ignore
    this.selectedCategory = null;
  }

  DeleteCategory(category:Category){
    this.errorMessage = "";
    this.isLoadingMode = true;
    this.selectedCategory = new Category(category.id,category.name);
    this.editMode = false;
    this.categoriesService.DeleteCategory(category).subscribe((data) => {
      this.categoriesService.GetCategories().subscribe((categories) => {
        this.categories = categories;
        this.editMode = false;
        //@ts-ignore
        this.selectedCategory = null;
        this.isLoadingMode = false;
      },err => {this.errorMessage = err; this.isLoadingMode = false;})
    },err => {this.errorMessage = err})
  }

  SaveChanges(categoryName:NgModel){
    if(categoryName.valid){
      this.errorMessage = "";
      this.isLoadingMode = true;
      const category = new Category(this.selectedCategory.id,categoryName.value);
      this.categoriesService.EditCategory(category).subscribe((data) => {
        this.categoriesService.GetCategories().subscribe((categories) => {
          this.categories = categories;
          this.editMode = false;
          //@ts-ignore
          this.selectedCategory = null;
          this.isLoadingMode = false;
        },err => {this.errorMessage = err; this.isLoadingMode = false;})
      },err => this.errorMessage = err)

    }

  }
}
