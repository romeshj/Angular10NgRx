import { Component, OnInit, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CustomerActions from '../store/customer.action';
import * as fromApp from '../../store/app.reducer';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  
  @Input() customer;
    
  constructor(private store: Store<fromApp.AppState>, public customerService : CustomerService) { }

  ngOnInit() {
  console.log(this.customer.length)
  
  }
  
  removeCustomer(id) {  
    this.store.dispatch(new CustomerActions.DeleteCustomer(id));
  }
  
  onEdit(c){
	this.customerService.getCustomer(c);
  }

}
