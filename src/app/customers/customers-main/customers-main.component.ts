import { Component, OnInit } from '@angular/core';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CustomersListComponent } from '../customers-list/customers-list.component';
import { Customer } from '../customer.model';
@Component({
  selector: 'app-customers-main',
  templateUrl: './customers-main.component.html',
  styleUrls: ['./customers-main.component.css']
})
export class CustomersMainComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }
  

}
