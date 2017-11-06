import { Component } from 'react';
import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const isTradeOpen = (x) => {
  console.log(x)
  if(x.BuyDate) {
    if(x.SellDate) {
      return "closed"
    } else {
      return "open"
    }
  } else {
    return "pending"
  }
}

// my @data = (
//   "BuyDate" => {
//     editable => yes,
//     formula => lsdkjf
//     },

//   }
// )
const PORTFOLIORISK = 0.05;
const computeStopLoss = (x) => x.Support * 0.98;
const computeRisk = (x) =>  x.Entry - computeStopLoss(x);
const computeEstimatedShares = (x) => Math.floor(1000/computeRisk(x));
const computeTradeCost = (x) => (x.Share * x.Price) + x.Commis;
const computeGain = (x) => {
  if (x.SellDate) {
    return x.Shares * x.SellPrice - x.SellCommis - computeTradeCost(x);
  } else {
    return '';
  }
}
const computePctGain = (x) => {
  if( x.SellDate) {
    return computeGain(x) / computeTradeCost(x);
  } else {
    return '';
  }
}

const pick = (name) => obj => obj[name]
const dataColumn = (name) => {
  return { 
    name: name,
    editable: true,
    formula: pick(name)
  }
}

const derivedColumn = (name, formula) => {
  console.log(name, formula)
  return {
    name: name,
    editable: false,
    formula: formula
  }
}

const columns = [
  derivedColumn("Active", isTradeOpen),
  dataColumn("BuyDate"),
  dataColumn("Symbol"),
  dataColumn("Notes"),
  dataColumn("Entry"),
  dataColumn("Support"),
  dataColumn("Target"),
  derivedColumn("SL", computeStopLoss),
  derivedColumn("Risk",computeRisk),
  derivedColumn("EstShares",computeEstimatedShares),
 // derivedColumn("PortRisk",computePortfolioRisk),
  dataColumn("Share"),
  dataColumn("Price"),
  dataColumn("Commis"),
  derivedColumn("Total",computeTradeCost),
  dataColumn("SellDate"),
  dataColumn("Shares"),
  dataColumn("NumSold"),
  dataColumn("SellPrice"),
  dataColumn("SellCommis"),
  derivedColumn("Gain",computeGain), 
  derivedColumn("PctGain",computePctGain),
]

const dummyData = [{
  BuyDate: 12345,
  Symbol: "foo",
  Notes: "this is a great trade",
  Entry: 2,
  Support: 1.9,
  Target: 5,
  Share: 10,
  Price: 2,
  Commis: 0.1,
  SellDate: 54321,
  Shares: 10,
  NumSold: 10,
  SellPrice: 6,
  SellCommis: 0.4
},
{
  BuyDate: 12345,
  Symbol: "foo",
  Notes: "this is a great trade",
  Entry: 2,
  Support: 1.9,
  Target: 5,
  Share: 10,
  Price: 2,
  Commis: 0.1,
  SellDate: '',
  Shares: 10,
  NumSold: 10,
  SellPrice: 6,
  SellCommis: 0.4
}]

class StockTable extends Component {

  constructor() {
    super();
    this.state = {
      data: dummyData
    }
    this.renderEditable = this.renderEditable.bind(this)
  }

  renderEditable (cellInfo) {  
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render () {
    return (
      <div className="stock-table">
        <ReactTable
          data={this.state.data}
          columns={
            columns.map((column) => {
              return {
                Header: column.name,
                id: column.name,
                maxWidth: 200,
                accessor: column.formula,
                Cell: column.editable ? this.renderEditable : column.name
              }
            })
          }
        />
      </div>
    )
  }
}

export default StockTable
