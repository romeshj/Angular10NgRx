import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HttpShoppingService } from '../service/http-shopping.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit ,OnDestroy{
  
  private errorSubscription : Subscription;
  error = null;
  constructor(private httpService : HttpShoppingService) { }
  
  ngOnInit() {
	this.errorSubscription = this.httpService.errorSub.subscribe(errorMessage =>{
		this.error = errorMessage;
	})
  }
  
  
  ngOnDestroy(){
  
  }
  
}
