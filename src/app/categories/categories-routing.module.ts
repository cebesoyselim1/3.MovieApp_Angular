import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CategoriesEditComponent } from "./categories-edit/categories-edit.component";
import { CategoriesHomeComponent } from "./categories-home/categories-home.component";
import { CategoryCreateComponent } from "./category-create/category-create.component";

const routes:Routes = [
  { path: "categories", component:CategoriesHomeComponent, canActivate: [AuthGuard], children: [
    { path: "", redirectTo:"create", pathMatch:"full" },
    { path: "create", component: CategoryCreateComponent },
    { path: "edit", component: CategoriesEditComponent },
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class CategoriesRoutingModule{

}
