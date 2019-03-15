import {connect} from 'react-redux';
import { PurchaseSummary } from '../components/purchase-summary';

import {
  callLoadingDataApi,
  updatePricingObj
} from '../actions/purchaseActions';

const mapStateToProps = state => {
	
	const Purchase 	= state.purchaseReducer;
	return {

        pricing: 		Purchase.get('pricing'),
        itemDetails: 	Purchase.get('itemDetails')

    }
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: 	async () => await dispatch( callLoadingDataApi() ),
    setPricing: async (param) => await dispatch ( updatePricingObj(param) )
  }
} 

const PurchaseSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseSummary);

export default PurchaseSummaryContainer;
