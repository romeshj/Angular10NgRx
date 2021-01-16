import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';

export const CREATE_CUSTOMER = '[Customers] Create Customer';
export const DELETE_CUSTOMER = '[Customers] Delete Customer';
export const EDIT_CUSTOMER = '[Customers] Edit Customer';

export class CreateCustomer implements Action {
  readonly type = CREATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class DeleteCustomer implements Action {
  readonly type = DELETE_CUSTOMER;
  constructor(public payload) {}
}

export class EditCustomer implements Action {
  readonly type = EDIT_CUSTOMER;
  constructor(public payload: Customer) {}
}

export type CustomerAction = CreateCustomer | DeleteCustomer | EditCustomer;

