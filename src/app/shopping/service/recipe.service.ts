import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();	
	recipes : Recipe[] = [];	
	constructor(
	private shoppingListSrv : ShoppingListService,
	private store: Store<fromApp.AppState>
	) {}
	
	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
	
	getRecipes(){
		return this.recipes.slice();
	}
	
	getRecipe(index : number){
		return this.recipes[index];
	}
	
	addIngredientsToShoppingList(ingredients : Ingredient[]){
		this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
		this.shoppingListSrv.setRecipeIngredients(ingredients)
	}
	
	addNewRecipe(recipe){
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
		
	}
	
	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
	
	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}
	
}
