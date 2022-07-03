import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();
    
    constructor(private slService: ShoppingListService){

    }
    // private recipes: Recipe[] = [
    //     new Recipe(
    //     'Pizza', 
    //     'A super tasty Pizza - Awesome', 
    //     'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg',
    //     [
    //         new Ingredient('crust', 1),
    //         new Ingredient('sauce', 4),
    //         new Ingredient('cheese', 5),
    //         new Ingredient('toppings', 2)
    //     ]),
    //     new Recipe(
    //     'Momos', 
    //     'Mouth Watering tandoori momos', 
    //     'https://media-cdn.tripadvisor.com/media/photo-s/14/af/70/7f/tandoori-momos.jpg',
    //     [
    //         new Ingredient('Flour', 5),
    //         new Ingredient('vegetables', 3),
    //         new Ingredient('food color', 2),
    //         new Ingredient('Mint Sauce', 1),           
    //     ])
    //   ];

    private recipes: Recipe[] = []

      getRecipes(){
          return this.recipes.slice();
      }

      fetchRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipe(index: number) : Recipe{
        return this.recipes.slice()[index];
      }

      addIngredientToShoppingList(ingredient: Ingredient[]){
        this.slService.addIngredients(ingredient);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}