import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PurchaseSummaryContainer from './containers/purchase-summary-container';

class App extends Component {
  render() {
    return (
      <PurchaseSummaryContainer />
    );
  }
}

export default App;
