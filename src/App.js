import React, { Component } from 'react';
import './App.css';
import StockTable from './StockTable/StockTable';

class App extends Component {
  render() {
    return (
      <div>
        <h1>It's an App!</h1>
        <StockTable/>
      </div>
    )
  }
}

export default App;
