import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App/>', () => {
  test('should render App correctly', () => {
    const app = shallow(<App />);

    expect(app.find('a.h-logo').length).toBe(1);
  });

  test('should render pages correctly', () => {
    const app = shallow(<App />);

    const routes = app.find(Route);
    expect(routes.length).toBe(2);

    expect(routes.get(0).props.path).toBe('/create');
    expect(routes.get(1).props.path).toBe('/');
  });
});
