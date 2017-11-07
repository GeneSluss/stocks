import { Component } from 'react';
import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const isTradeOpen = (x) => {
  if(x.BuyDate) {
    if(x.SellDate) {
      return "closed"
    } else {
      return "open"
    }
  } else {
    return "pend"
  }
}

// my @data = (
//   "BuyDate" => {
//     editable => yes,
//     formula => lsdkjf
//     },

//   }
// )
const PORTFOLIOSIZE = 100000;
const PORTFOLIORISK = 0.005;
const MAXHOLDINGSIZE = 24000;
const computeStopLoss = (x) => Math.round(x.Support * 0.98 *100) /100;
const computeRisk = (x) =>  Math.round( 100 * (x.Entry - computeStopLoss(x))) / 100;
const computeEstimatedShares = (x) => Math.floor(Math.min(PORTFOLIOSIZE*PORTFOLIORISK/computeRisk(x), MAXHOLDINGSIZE/x.Price));
const computeTradeCost = (x) => ((x.Share * x.Price) + x.Commis);
const computeGain = (x) => {
  if (x.SellDate) {
    return Math.round(100 * ( x.NumSold * x.SellPrice - x.SellCommis - computeTradeCost(x) ) / 100 );
  } else {
    return '';
  }
}
const computePctGain = (x) => {
  if( x.SellDate) {
    return Math.round( 100 * 100 * computeGain(x) / computeTradeCost(x)) / 100;
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
  return {
    name: name,
    editable: false,
    formula: formula
  }
}

const columns = [
  dataColumn("id"),
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
  //dataColumn("Shares"),
  dataColumn("NumSold"),
  dataColumn("SellPrice"),
  dataColumn("SellCommis"),
  derivedColumn("Gain",computeGain), 
  derivedColumn("PctGain",computePctGain),
]


class StockTable extends Component {

  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      data: this.props.data
    }
    this.renderEditable = this.renderEditable.bind(this)
  }

  componentWillReceiveProps (props) {
    console.log(props.data)
    this.setState({data: props.data})
  }

  renderEditable (cellInfo) {  
    return (
      <div
        style={{ backgroundColor: "#fafafa", textAlign: "right" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          console.log(data[cellInfo.index])
          let updatedMapping = {}
          updatedMapping[cellInfo.column.id] = data[cellInfo.index][cellInfo.column.id]
          this.props.update(data[cellInfo.index].id, updatedMapping)
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
        <button onClick={this.props.addRow}>add a row!</button>
        <ReactTable
        style={{ backgroundColor: "#efefef", textAlign: "right" }}
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
