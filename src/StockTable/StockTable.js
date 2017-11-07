import { Component } from 'react';
import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class StockTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    this.renderEditable = this.renderEditable.bind(this)
  }

  componentWillReceiveProps (props) {
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
            this.props.columns.map((column) => {
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
