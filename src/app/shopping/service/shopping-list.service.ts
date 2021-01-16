import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

  //onIngredientChanged  = new EventEmitter<Ingredient[]>();
  onIngredientChanged  = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  ingredients : Ingredient[] = [
	new Ingredient('Apples', 5),
	new Ingredient('Tomatoes', 10)
  ];
  
  recipeIngredientsLists = [];
  
  getIngredients(){
	return this.ingredients.slice();
  }
  
  
	addIngredient(newIngredient : Ingredient){
		this.ingredients.push(newIngredient);
		//this.onIngredientChanged.emit(this.ingredients.slice());
		this.onIngredientChanged.next(this.ingredients.slice());
	}
	
	addToShoppingList(recipeIngredients){
		console.log( " ==== recipeIngredients ==== ", recipeIngredients)
		this.ingredients.push(...recipeIngredients);
		//this.onIngredientChanged.emit(this.ingredients.slice());
		this.onIngredientChanged.next(this.ingredients.slice());
	}
	
	setRecipeIngredients(recipeIngredients){
		this.recipeIngredientsLists = recipeIngredients;
	}
	
	getRecipeIngredients(){
		return this.recipeIngredientsLists;
	}
	
	getIngredient(index : number){
	    return this.ingredients[index]
	}
	
	updateIngredient(index : number, editedIngredient : Ingredient){
		this.ingredients[index] = editedIngredient;
		this.onIngredientChanged.next(this.ingredients.slice());
	}
	
	deleteIngredient(index : number){
		this.ingredients.splice(index, 1);
		this.onIngredientChanged.next(this.ingredients.slice());
	}
}
