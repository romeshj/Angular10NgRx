import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	
  ingredients : Observable<{ ingredients : Ingredient[]}>;  
  selecteRecipeIngredients = [];	
  constructor(
  private store: Store<fromApp.AppState>
  ) { }
	
  ngOnInit(): void {
	this.ingredients = this.store.select('shoppingList');
  }
  
  onEditItem(index: number){
	this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
   
}



