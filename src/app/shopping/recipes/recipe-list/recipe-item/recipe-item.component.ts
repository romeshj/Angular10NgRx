import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	
  @Input() recipe : Recipe;
  @Input() recipeIndex;
  
  constructor( private recipeSrv : RecipeService ) { }

  ngOnInit(): void {
	
  }
  
}
