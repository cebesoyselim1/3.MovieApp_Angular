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

  constructor(private categoriesService:CategoriesService,
              private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.activedRoute.params.subscribe((route) => {
      this.currentCategoryRoute = route.categoryId;
    })
  }

  GetCategories():Category[]{
    return this.categories;
  }

}
