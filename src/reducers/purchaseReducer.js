import {fromJS} from 'immutable';
import {createReducer} from 'redux-act';

import {
    loadPurchaseData,
    updatePricing
} from '../actions/purchaseActions';
const initialState = fromJS({
    pricing: {},
    itemDetails: {}
} );
const purchaseReducer = createReducer({	

	[ loadPurchaseData ]: ( state, args ) => {
		return state.merge({
            pricing: args.pricing,
            itemDetails: args.itemDetails
		});
    },
    [ updatePricing ]: ( state, params ) => {
		  return state.merge({
        pricing: params
		  });
    }
}, initialState);
export default purchaseReducer;
