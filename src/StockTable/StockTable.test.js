import React from 'react';
import ReactDOM from 'react-dom';
import StockTable from './StockTable';
import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StockTable />, div);
});
