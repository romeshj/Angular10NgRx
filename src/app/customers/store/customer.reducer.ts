import { Customer } from '../customer.model';
import * as CustomerActions from './customer.action';

export interface State {
	customers : Customer[]
}

const initialState: State = {
	customers : [new Customer('1', 'Andrien', 27, true)]
}

export function customerReducer(
	state: State = initialState,
	action : CustomerActions.CustomerAction
){
	switch(action.type){
		case CustomerActions.CREATE_CUSTOMER : 
		return {
			...state,
			customers : [...state.customers, action.payload]
		}
		
		case CustomerActions.DELETE_CUSTOMER : 
		console.log(action.payload)
		console.log(state.customers.filter(c => c.id !== action.payload))
		return {
			...state,
			customers : state.customers.filter(c => c.id !== action.payload)
		}
		
		case CustomerActions.EDIT_CUSTOMER :
		const customer = state.customers.filter(c => c.id == action.payload.id);
		
		const updatedCustomer = {
			...customer,
			...action.payload
		};
				
		const updatedCustomers = [...state.customers];
		
		updatedCustomers.map((c, i) => {
         if (c.id == updatedCustomer.id){		    
            updatedCustomers[i] = updatedCustomer;
          }
        });		
		
		return {
			...state,
			customers : updatedCustomers
			
		}
		default:
		return state;
	}
}
