import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories:Category[] = [];

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.GetCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  GetCategories():Category[]{
    return this.categories;
  }

}
