import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerSub = new Subject<Customer>();
  
  constructor() { }
  
  getCustomer(c){
    console.log(c)
	this.customerSub.next(c);
  }
}
