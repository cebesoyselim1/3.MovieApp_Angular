import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { QuestionPopUp } from 'src/app/shared/model/question-popup.model';
import { QuestionPopUpService } from 'src/app/shared/services/question-popup.service';
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
  currentStatus = "";
  //@ts-ignore
  selectedCategory:Category = null;
  isLoadingMode = false;

  constructor(private categoriesService:CategoriesService,
              private questionPopUpService:QuestionPopUpService) { }

  ngOnInit(): void {
    this.isLoadingMode = true;
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
      this.isLoadingMode = false;
    },err => {this.errorMessage = err; this.isLoadingMode = false;});

    this.questionPopUpService.questionPopUp.subscribe((data) => {
      if(data?.answer){
        if(this.currentStatus == "edit"){
          this.SaveChanges();
        }else{
          this.DeleteCategory();
        }
      }
    })
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

  DeleteCategoryMiddleware(category:Category){
    this.selectedCategory = new Category(category.id,category.name);
    this.currentStatus = "delete";
    this.ShowQuestionPopUp("delete");
  }

  DeleteCategory(){
    this.errorMessage = "";
    this.isLoadingMode = true;
    this.editMode = false;
    this.categoriesService.DeleteCategory(this.selectedCategory).subscribe((data) => {
      this.categoriesService.GetCategories().subscribe((categories) => {
        this.categories = categories;
        this.editMode = false;
        //@ts-ignore
        this.selectedCategory = null;
        this.isLoadingMode = false;
      },err => {this.errorMessage = err; this.isLoadingMode = false;})
    },err => {this.errorMessage = err})
    //@ts-ignore
    this.questionPopUpService.questionPopUp.next(null);
    this.currentStatus = "";
  }

  SaveChangesMiddleware(categoryName:NgModel){
    if(categoryName.valid){
      this.selectedCategory.name = categoryName.value;
      this.currentStatus = "edit";
      this.ShowQuestionPopUp("edit");
    }
  }

  SaveChanges(){
    this.errorMessage = "";
    this.isLoadingMode = true;

    this.categoriesService.EditCategory(this.selectedCategory).subscribe((data) => {
      this.categoriesService.GetCategories().subscribe((categories) => {
        this.categories = categories;
        this.editMode = false;
        //@ts-ignore
        this.selectedCategory = null;
          this.isLoadingMode = false;
      },err => {this.errorMessage = err; this.isLoadingMode = false;})
    },err => this.errorMessage = err)
    //@ts-ignore
    this.questionPopUpService.questionPopUp.next(null);
    this.currentStatus = "";
  }

  ShowQuestionPopUp(currentMode:string){
    if(currentMode == "edit"){
      const q = new QuestionPopUp(`Do you want to change (${this.selectedCategory.name})?`,["Yes","No"],"",true);
      this.questionPopUpService.questionPopUp.next(q);
    }else{
      const q = new QuestionPopUp(`Do you want to delete (${this.selectedCategory.name})?`,["Yes","No"],"",true);
      this.questionPopUpService.questionPopUp.next(q);
    }
  }

}
