import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CustomerActions from '../store/customer.action';
import * as fromApp from '../../store/app.reducer';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, OnDestroy {
	
  customers : Customer[]; // if you use subscribe then no need to pass as Observable
  subscription : Subscription;  
  
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {  
	// you can use subscribe also
	this.subscription = this.store.select('customer').subscribe(stateData => {
	  console.log(" stateData " , stateData);
	  this.customers = stateData.customers;
	  console.log(this.customers.length)
	})	
  }
  
  ngOnDestroy(){
	this.subscription.unsubscribe();
  }
  
}
