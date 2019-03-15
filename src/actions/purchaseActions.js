import {createAction} from 'redux-act';
export const loadPurchaseData 	= createAction('LOAD_DATA');
export const updatePricing 	= createAction('UPDATE_PRICING');

export function callLoadingDataApi() {
    return async (dispatch) => {
        let data = await getPricingData(1000);
        dispatch(loadPurchaseData(data));
    };
}
export function updatePricingObj(param) {
    return async (dispatch) => {
        dispatch(updatePricing(param));
    };
}

export const getPricingData = (delay = 1000) => {
    return new Promise(function(resolve, reject) {
        setTimeout(()=>{resolve(pricingData)}, delay);
    });
}
const pricingData = {
    pricing : {
        subtotal: 102.96,
        savings: 3.85,
        tax: 8.92,
        total: 108.03,
        zip: 85050
    },
    itemDetails: {
        item_name: 'Essentials by OFM ESS-3085 Racing Style Leather Gaming Chair, Red',
        quantity: 1,
        image: '/chair.jpeg',
        tooltip_message: 'Picking up your item in the store helps cut costs and we pass the savings on to you'
    }
}