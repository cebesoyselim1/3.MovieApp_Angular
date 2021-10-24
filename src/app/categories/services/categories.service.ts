import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Category } from "../models/category.model";


export class CategoriesService{

  url_firebase = "https://movieapp-61f41-default-rtdb.firebaseio.com/categories";

  constructor(private http:HttpClient){}

  GetCategories():Observable<Category[]>{
    let newUrl = `${this.url_firebase}.json`;
    return this.http.get<Category[]>(newUrl).pipe(
      map((datas) => {
        let categories:Category[] =  [];

        for(let key in datas){
          datas[key].id = key;
          categories.push(datas[key]);
        }

        return categories;
      })
    );
  }

  GetCategoryById(categoryId:string):Observable<Category>{
    const newUrl = `${this.url_firebase}/${categoryId}.json`;
    return this.http.get<Category>(newUrl).pipe(
      map((data) => {
        const category = new Category(categoryId,data.name);
        return category;
      })
    )
  }

  AddCategory(category:Category):Observable<Category>{
    const newUrl = `${this.url_firebase}.json`;
    return this.http.post(newUrl,category).pipe(
      map((data) => {
        return category;
      })
    )
  }

}
