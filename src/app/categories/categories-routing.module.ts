import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../auth/guards/admin.guard";
import { AuthGuard } from "../auth/guards/auth.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { CategoriesEditComponent } from "./categories-edit/categories-edit.component";
import { CategoriesHomeComponent } from "./categories-home/categories-home.component";
import { CategoryCreateComponent } from "./category-create/category-create.component";

const routes:Routes = [
  { path: "categories", component:CategoriesHomeComponent, canActivate: [AuthGuard], children: [
    { path: "", redirectTo:"create", pathMatch:"full" },
    { path: "create", component: CategoryCreateComponent, canActivate: [AdminGuard] },
    { path: "edit", component: CategoriesEditComponent, canActivate: [AdminGuard] },
    { path:"**", component: PageNotFoundComponent }
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class CategoriesRoutingModule{

}
