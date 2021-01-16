import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingComponent } from '../shopping.component';
import { HeaderComponent } from '../header/header.component';
import { AuthComponent } from '../../auth/auth.component';

import { ShoppingListsModule } from './shopping-lists.module';
//import { RecipesModule } from './recipes.module';
import { SharedModule } from '../../shared.module';

/*import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from '../recipes/recipe-list/recipe-item/recipe-item.component';
import { AuthGuard } from '../../services/auth.guard';
import { RecipeResolverService } from '../service/recipe-resolver.service';*/

const routes : Routes = [	
	{
		path: '', component: ShoppingComponent, children : [
			/*{
				path: 'recipes',
				loadChildren : () => import('./recipes.module').then(r => r.RecipesModule)
			},*/
			
			/*{
				path: 'recipes', component: RecipesComponent, canActivate : [AuthGuard], children : [
					{path: '', component: RecipeStartComponent},
					{path: 'new', component: RecipeEditComponent},
					{path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
					{path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
				]
			},*/
			{
				path: 'shoppinglist',
				loadChildren : () => import('./shopping-lists.module').then(sl => sl.ShoppingListsModule)
			},
			{path: 'auth', component: AuthComponent}
		]
	}
]

@NgModule({
  declarations: [
	HeaderComponent,
    ShoppingComponent,	        
    AuthComponent,
	
	/*RecipesComponent,
  RecipeListComponent,
  RecipeDetailComponent,
  RecipeStartComponent,
  RecipeEditComponent,
  RecipeItemComponent*/
	
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
	ShoppingListsModule,
	//RecipesModule,
	SharedModule,
	RouterModule.forChild(routes)
  ],
   providers: [AuthGuard]
})
export class ShoppingModule { }
