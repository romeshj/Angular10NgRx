import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CustomerActions from '../store/customer.action';
import * as fromApp from '../../store/app.reducer';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit ,OnDestroy{
  
  subscription : Subscription;
  customerSub : Subscription;
  editMode : false;
  customers : Customer[]; 
  @ViewChild('customerFrm', {static :  false}) customerForm : NgForm; 
  
  constructor(private store: Store<fromApp.AppState>, public customerService : CustomerService) {
	
  }

  ngOnInit() {
	console.log(this.store);
	
	this.subscription = this.store.select('customer').subscribe(stateData => {
	  console.log(" stateData " , stateData);
	  this.customers = stateData.customers;
	});
	
	
	this.customerSub = this.customerService.customerSub.subscribe(c => {
	    this.editMode = true;
		console.log(c)
		const id = c.id;
		const name = c.name;
		const age = c.age;
		const active = c.active;
		console.log(id, name, age, active)
		this.customerForm.setValue({
			id: id,
			name : name,
			age : age,
			isActive : active
		})
		
		
	})
	
  }

  onSubmit(form){
    
	console.log(form.value);
	const id = form.value.id;
	const name = form.value.name;
	const age = form.value.age;
	const active = form.value.isActive;
	const newCustomer = new Customer(id, name,age,active);
	console.log(newCustomer)
	this.editMode ? this.store.dispatch(new CustomerActions.EditCustomer(newCustomer)) : this.store.dispatch(new CustomerActions.CreateCustomer(newCustomer))
	this.onClear(form)
  }
  
  onClear(form){
	form.reset();
	this.editMode = false;
  }
  
   ngOnDestroy(){
	this.subscription.unsubscribe();
	this.customerSub.unsubscribe();
	this.editMode = false;
  }
}
