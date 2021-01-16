import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../../service/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingFrm', {static :  false}) ingredientForm : NgForm;
  submitted = false;
  subscription : Subscription;
  editMode = false;
  editedItem: Ingredient;
  
  constructor(
  public shoppingListSrv : ShoppingListService,
  private store: Store<fromApp.AppState>
  ) { }
	
  ngOnInit() {
  console.log(this.store)
	this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
	  console.log(" stateData " , stateData);
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.ingredientForm.setValue({
            ingredientName: this.editedItem.name,
            ingredientAmount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });	
  }
    
  checkIngredientNameExistence(ingrName: string):boolean {
	const allIngredients = this.shoppingListSrv.getIngredients();
    return allIngredients.some(e => e.name === ingrName);
  }
  
  
    
  onSubmit(form){
  
	this.submitted = true;
	const ingredient = form.value;
	const ingName = ingredient.ingredientName;
	const ingAmount = parseInt(ingredient.ingredientAmount);
	const ingredientExist = this.checkIngredientNameExistence(ingName);
	const newIng = new Ingredient(ingName, ingAmount);
	this.editMode ? this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIng)) : !ingredientExist ? this.store.dispatch(new ShoppingListActions.AddIngredient(newIng)) : null;
	form.reset();
	this.editMode = false;
  }
  
  onClear(){
	this.ingredientForm.reset();
	this.editMode = false;
	this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  
  onDelete(){
	this.store.dispatch(new ShoppingListActions.DeleteIngredient())
	this.onClear();
  }
  
  
  ngOnDestroy(){
	this.subscription.unsubscribe();
	this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
