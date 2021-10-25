import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { CategoriesService } from "./services/categories.service";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations:[
    CategoriesHomeComponent,
    CategoriesComponent
  ],
  imports:[
    HttpClientModule,
    CategoriesRoutingModule
  ],
  exports:[
    CategoriesHomeComponent
  ],
  providers:[CategoriesService]
})

export class CategoriesModule{

}
