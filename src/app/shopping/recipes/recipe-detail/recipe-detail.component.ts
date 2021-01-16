import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	
  recipe : Recipe;
  ingredient : Ingredient;
  
  constructor(private recipeSrv : RecipeService, private activatedRoute: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {  
	const recipeIndex = +this.activatedRoute.snapshot.params['id'];
	this.activatedRoute.params
	.subscribe(
		(params : Params) => {
			console.log(params['id'], " ================== ")
			this.recipe = this.recipeSrv.getRecipe(+params['id']);
			console.log(this.recipe)
			//this.ingredient = this.recipe.ingredients;	
			//console.log(this.recipe.ingredients);			
		}
	)
	//console.log("selectedRecipeDetail", this.selectedRecipeDetail)
	
  }
  
  onAddToShoppingList(){
    //this.ingredient = this.recipe.ingredients ? this.recipe.ingredients : null;
	console.log(this.recipe.ingredients)
	this.recipeSrv.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  
  onEditRecipe(){
	this.router.navigate(['edit'], {relativeTo : this.activatedRoute})
  }
  
  onDeleteRecipe(){
	const recipeIndex = +this.activatedRoute.snapshot.params['id'];
	this.recipeSrv.deleteRecipe(recipeIndex);
	this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
