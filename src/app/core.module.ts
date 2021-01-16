import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecipeService } from './shopping/service/recipe.service';
import { ShoppingListService } from './shopping/service/shopping-list.service';
import { HttpShoppingService } from './shopping/service/http-shopping.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  providers: [
    RecipeService, 
	ShoppingListService,
	HttpShoppingService, 
	{
		provide : HTTP_INTERCEPTORS,
		useClass : AuthInterceptorService,
		multi : true
	}
  ]
})
export class CoreModule {}
