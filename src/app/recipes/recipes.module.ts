import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { ResipeStartComponent } from "./resipe-start/resipe-start.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ResipeStartComponent,
        RecipeEditComponent
    ],
    imports: [RouterModule, SharedModule, FormsModule, ReactiveFormsModule, RecipeRoutingModule],
    exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ResipeStartComponent,
        RecipeEditComponent
    ]
})
export class RecipesModule {

}