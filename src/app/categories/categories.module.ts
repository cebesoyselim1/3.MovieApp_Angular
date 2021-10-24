import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { CategoriesService } from "./services/categories.service";

@NgModule({
  declarations:[],
  imports:[
    HttpClientModule
  ],
  exports:[],
  providers:[CategoriesService]
})

export class CategoriesModule{

}
