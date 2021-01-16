import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { HttpShoppingService } from '../../service/http-shopping.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes : Recipe[];
	subscription: Subscription;
	isFetching = true;
  constructor(private recipeSrv : RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private httpService : HttpShoppingService) { }

  ngOnInit() {
	this.subscription = this.recipeSrv.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
	this.httpService.fetchRecipes().subscribe(() => this.isFetching = false);
	this.recipes = this.recipeSrv.getRecipes();	
	console.log(this.recipes.length , " ==== this.recipes RecipeListComponent ==== ");
	
	
  }
  
  onAddNewRecipe(){
	this.router.navigate(['new'], {relativeTo : this.activatedRoute})
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
