import React, { Component } from 'react';
import Styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Div = Styled.div`
   cursor: pointer;
   align-items: center;
   width: fit-content;
   margin-left: 20px;
`;

class Expander extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isExpanderOpen: false
      }
  }
  toggleExpander = () => {
      this.setState({isExpanderOpen: !this.state.isExpanderOpen})
  }
  render() {
        const { isExpanderOpen } = this.state;
        let firstWord;
        if(this.props.informative) {
            firstWord = isExpanderOpen ? 'Hide' : 'See';
        }
        else {
            firstWord = isExpanderOpen ? 'Hide' : 'Apply';
        }
        return (
            <div style={{display: 'block', width: 350}}>
            <Div 
                style={{display: 'flex', border: isExpanderOpen ? 'solid 1px #cccccc': '' }} 
                onClick={this.toggleExpander}
            >
                <Button>{`${firstWord} ${this.props.title}`}</Button>
                <i className="material-icons">add</i>
            </Div>
            {this.state.isExpanderOpen && 
                <Div style={{display: this.props.flex ? 'flex' : 'block'}}>
                    {this.props.children}
                </Div>
            }
          </div>
        )
    
  }
}

export default Expander;