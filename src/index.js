import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StockSpec from './TableSpecs/Stocks';
import {StockFormulae} from './formulae';
import StockTable from './StockTable/StockTable';

const Stocks = makeTable(StockSpec, StockFormulae)
// const Options = makeTable('options.json', ...);

ReactDOM.render(
 <App tables={[Stocks, Stocks]}/>, document.getElementById('root'));
// registerServiceWorker();


function pick (name) {
  return obj => obj[name]
}
 
const dataColumn = (name) => {
  return { 
    name: name,
    editable: true,
    formula: pick(name)
  }
}

const derivedColumn = (name, formula) => {
  return {
    name: name,
    editable: false,
    formula: formula
  }
}

//return a react component that we can render, and emit a message to electron to generate a table
function makeTable(spec, formulae) {
  const columns = spec.map((colRep) => {
    return {
      name: colRep.name,
      formula: (colRep.type === "Derived" ? formulae[colRep.formula] : pick(colRep.name)),
      editable: !(colRep.type === "Derived"),
    }
  })
  return buildTable(columns)
}


function buildTable (columns) {
  return function (data, updater, adder) {
    return (<StockTable columns={columns} data={data} update={updater} addRow={adder}/>)
  }
}

/*
column: {
  name: ColumnName,
  formula: (x) => x.y,
  editable: true
} 
*/
