import { Injectable } from '@angular/core';
import  { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../shared/recipe.model';
import { HttpShoppingService } from './http-shopping.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private httpService : HttpShoppingService, private recipeSrv : RecipeService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeSrv.getRecipes();
	console.log(recipes , "==== RecipeResolverService===")
	if (recipes.length === 0) {
	console.log("if")
	return this.httpService.fetchRecipes();
	}
	else{
	console.log("else")
		return recipes;
	}
  }
}
