import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Category } from "../models/category.model";

@Injectable()

export class CategoriesService{

  private url_firebase = "https://movieapp-61f41-default-rtdb.firebaseio.com/categories";

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

  EditCategory(category:Category):Observable<Category>{
    const newUrl = `${this.url_firebase}/${category.id}.json`;
    return this.http.put<Category>(newUrl,category).pipe(
      map((data) => {
        return category;
      })
    )
  }

  DeleteCategory(category:Category):Observable<Category>{
    const newUrl = `${this.url_firebase}/${category.id}.json`;
    return this.http.delete<Category>(newUrl).pipe(
      map((data) => {
        return category;
      })
    )
  }

}
