import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomersListComponent } from '../customers-list/customers-list.component';
import { CustomersMainComponent } from '../customers-main/customers-main.component';

/*const routes : Routes = [	
	{ 
		path: '', component: CustomersMainComponent, children : [
			{path: '', redirectTo: 'dashboard/customers',  pathMatch: 'full'}
		] 
	}	
]*/


const routes : Routes = [	
	{ 
		path: 'customers', component: CustomersMainComponent, pathMatch: 'full'
	}	
]

@NgModule({
  declarations: [CreateCustomerComponent, CustomerDetailsComponent, CustomersListComponent, CustomersMainComponent],
  imports: [
    CommonModule,
	FormsModule,
	RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
