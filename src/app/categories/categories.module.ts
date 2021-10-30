import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { CategoriesService } from "./services/categories.service";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations:[
    CategoriesHomeComponent,
    CategoriesComponent,
    CategoryCreateComponent,
    CategoriesEditComponent
  ],
  imports:[
    BrowserModule,
    HttpClientModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    CategoriesHomeComponent,
    CategoriesComponent
  ],
  providers:[CategoriesService]
})

export class CategoriesModule{

}
