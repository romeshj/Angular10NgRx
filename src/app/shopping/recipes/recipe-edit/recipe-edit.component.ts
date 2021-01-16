import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
	recipe: Recipe;
	recipeForm : FormGroup;
	
  constructor(private recipeSrv: RecipeService, private activatedRoute: ActivatedRoute, private formBuilder : FormBuilder, private router: Router) { }

  ngOnInit() {
	this.activatedRoute.params
	.subscribe(
		(params : Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			this.recipe = this.recipeSrv.getRecipe(this.id);
			this.initForm();
		}
	)
  }
  
  get ingredientsControls() : FormArray {
	return (this.recipeForm.get("ingredients") as FormArray)
  }
  
  ingredients() : FormArray {
	return (this.recipeForm.get("ingredients") as FormArray);
  }
  
  initForm(){  	
	  let recipeName = '';
	  let recipeImagePath = '';
	  let recipeDescription = '';
	  let recipeIngredients = [];
	  if(this.editMode){
		const recipe = this.recipe;
		recipeName = recipe.name;
		recipeImagePath = recipe.imagePath;
		recipeDescription = recipe.description;
		if(recipe['ingredients']){
			for(let ingredient of recipe['ingredients']){
				recipeIngredients.push(this.ingredientsValues(ingredient.name,ingredient.amount))
			}
		}		
	  }
	  this.recipeForm = this.formBuilder.group({
			name : [recipeName, [Validators.required]],
			imagePath : [recipeImagePath, [Validators.required]],
			description : [recipeDescription, [Validators.required]],
			ingredients : recipeIngredients && recipeIngredients.length ? this.formBuilder.array(recipeIngredients) : this.formBuilder.array([])
	  })
	  
  }
  
  ingredientsValues(n,a) {
	   return this.formBuilder.group({
		 name: n,
		 amount: a,
	   })
	}
	
 newIngrendientControl() {
	return this.formBuilder.group({
		 name: [null, Validators.required],
		 amount: [null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
	   })
 }
  
  onSubmit(){
	console.log(this.recipeForm.value);
	if (this.editMode) {
      this.recipeSrv.updateRecipe(this.id, this.recipeForm.value);
    }
	else{
		this.recipeSrv.addNewRecipe(this.recipeForm.value);
	}
	this.onCancel();
  }
  
  onAddIngredient() {
	this.ingredients().push(this.newIngrendientControl());	
  }
  
  onDeleteIngredient(index : number){
	this.ingredients().removeAt(index);
  }
  
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
