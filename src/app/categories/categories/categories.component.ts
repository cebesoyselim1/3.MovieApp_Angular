import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories:Category[] = [];
  currentCategoryRoute = "";
  errorMessage = "";
  isLoadingMode = false;

  constructor(private categoriesService:CategoriesService,
              private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoadingMode = true;
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
      this.isLoadingMode = false;
    },err => {this.errorMessage = err; this.isLoadingMode = false;})

    this.activedRoute.params.subscribe((route) => {
      this.currentCategoryRoute = route.categoryId;
    })
  }

  GetCategories():Category[]{
    return this.categories;
  }

}
