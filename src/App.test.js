import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('has a stock table inside', () => {
  //given
  const app = mount(<App/>)
  //when
  const result = app.find('.stock-table')
  //then
  expect(result.length).toEqual(1)
})
