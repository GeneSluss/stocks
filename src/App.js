import React, { Component } from 'react';
import './App.css';
import StockTable from './StockTable/StockTable';
const {ipcRenderer} = window.require('electron');



const updater = (id, mapping) => ipcRenderer.send('data', {method: 'update', data: mapping, row: id})
const rowAdder = (fetcher) => {
  ipcRenderer.send('data', {method: 'increment'})
}

class App extends Component {
  componentWillMount () {
    this.setState({data: []})
    ipcRenderer.send('data', {method: 'get'})
    ipcRenderer.on('data', (event, arg) => {
      this.setState({data: arg})
    })
  }
  render() {
    return (
      <div>
        <h1>It's an App!</h1>
        {this.props.table(this.state.data, updater, rowAdder)}
        {/* <StockTable data={this.state.data} update={updater} addRow={rowAdder}/> */}
      </div>
    )
  }
}

export default App;
