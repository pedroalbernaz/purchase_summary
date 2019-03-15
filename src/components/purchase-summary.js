import React, { Component } from 'react';
import Styled from 'styled-components';
import Expander from './expander';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import _ from 'lodash';
const Wrapper = Styled.div`
    width: 350px;
    > div {
        display: flex
    }
    button {
        text-decoration: underline !important;
        background-color: white !important;
    }
    img {
        width: 150px;
    }
    .popper {
        opacity: 1 !important;
        top: -7px !important;
        div {
            background-color: white;
            color: black;
            width: 50%
            font-size: 15px;
        }
    }
    .arrow::before{
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent white;
        transform: translate(-50%, 0);
    }
    .labels {
        width: 100%;
        margin-left: 20px;
    }
    .apply_button {
       width: 200px;
       border-radius: 10px;
       boder: solid 1px #cccccc;
       margin-left: 30px
    }
    .tooltip {
        width: 250px
    }
`;

export class PurchaseSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promoCode: '',
            open: false,
            arrowRef: null
        }
        this.applyCode = this.applyCode.bind(this)
    }
    componentDidMount() {
        this.props.loadData();
    }
    updatePromoCode = (e) => {
        this.setState({promoCode: e.target.value});
    }
    applyCode () {
        const pricing =  _.cloneDeep(this.props.pricing);
        if(this.state.promoCode === 'DISCOUNT') {
            pricing.subtotal = pricing.subtotal * 0.9
            pricing.total = pricing.subtotal + pricing.tax - pricing.savings;
            this.props.setPricing(pricing);
        }
        console.log(pricing)
    }
    handleTooltipClose = () => {
        this.setState({ open: false });
      };
    
    handleTooltipOpen = () => {
        this.setState({ open: true });
    };
    handleArrowRef = node => {
        this.setState({
          arrowRef: node,
        });
    };
    render() {
    
        const { pricing, itemDetails } = this.props;
        let price = pricing.subtotal ? pricing.subtotal.toFixed(2) : 0;
        let savings = pricing.savings ? pricing.savings.toFixed(2) : 0;
        let priceAfterSavings = price - savings;
        let tax = pricing.tax ? pricing.tax.toFixed(2) : 0;
        let total = pricing.total ? pricing.total.toFixed(2) : 0;
        let toolTipMessage = itemDetails.tooltip_message || '';
        let imageURL = itemDetails.image ? require(__dirname+itemDetails.image) : ''
        return (
            <Wrapper>
                <div>
                    <div className='labels'>
                        <label>Subtotal</label>
                    </div>
                    <div><span>{`$${price}`}</span></div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                <ClickAwayListener onClickAway={this.handleTooltipClose}>    
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                        modifiers: {
                          arrow: {
                            enabled: Boolean(this.state.arrowRef),
                            element: this.state.arrowRef,
                          },
                        },
                      }}
                      className={'tooltip'}
                      classes={{popper:'popper'}}
                      onClose={this.handleTooltipClose}
                      open={this.state.open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={
                        <React.Fragment>
                            {toolTipMessage}
                            <span className={'arrow'} ref={this.handleArrowRef} />
                        </React.Fragment>  
                      }
                    >
                    <Button onClick={this.handleTooltipOpen}>Pickup savings</Button>
                </Tooltip>
                </ClickAwayListener>
                <div style={{color:'red', width: '100%', textAlign:'right'}}>{`-$${savings}`}</div>
                </div>
                <div className='labels'> 
                    <label style={{width:'100%'}}>Est. taxes and fees <br/> (Based on 95134)</label>
                    <span style={{marginRight: 20}}> {`$${tax}`}</span>
                </div>
                <hr/>
                <div className='labels'> 
                    <label style={{width:'100%', fontSize: 20}}><b>Est. total </b></label>
                    <span style={{marginRight: 20}}> {`$${total}`}</span>
                </div>
                <Expander flex informative title={'Items Details'}>
                    <div><img src={imageURL} /></div>
                    <div>
                        <p>{itemDetails.item_name || ''} </p>
                        <div style={{display:'flex'}}>
                           <div>
                                <div>{`$${price}`}</div>
                                <div>$<strike>{`${priceAfterSavings}`}</strike></div>
                            </div>
                            <div style={{marginLeft: '25%'}}>
                                {`Quantity: ${itemDetails.quantity || 0}`}
                            </div>
                        </div>
                    </div>
                </Expander>
                <hr/>
                <Expander title={'promo code'}>
                    <p>promo code</p>
                    <div style={{display:'flex', paddingBottom: 20}}>
                        <input onChange={this.updatePromoCode} value={this.state.promoCode} />
                        <button className='apply_button' onClick={()=>{this.applyCode()}}>
                            Apply
                        </button>
                    </div>                    
                    
                </Expander>
            </Wrapper>
        );
    }
}
