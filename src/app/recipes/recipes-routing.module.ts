import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { ResipeStartComponent } from "./resipe-start/resipe-start.component";

const routes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
        resolve: { RecipeResolver },
        children: [
            { path: '', component: ResipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: { RecipeResolver } },
            { path: ':id/edit', component: RecipeEditComponent, resolve: { RecipeResolver } }

        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {

}