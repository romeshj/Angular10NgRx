import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { SharedModule } from '../../shared.module';
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
	SharedModule,
	RouterModule.forChild([{ path: '', component: ShoppingListComponent }])
  ]
})
export class ShoppingListsModule { }
