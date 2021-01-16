import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{path: '', redirectTo: 'dashboard/recipes' , pathMatch: 'full'},
	{
		path: 'dashboard',
		loadChildren : () => import('./shopping/shopping/shopping.module').then(s => s.ShoppingModule)
	},
	{
		path: 'dashboard',
		loadChildren : () => import('./customers/customer/customer.module').then(c => c.CustomerModule)
	},
	{
		path: '**', component: NotFoundComponent, pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
