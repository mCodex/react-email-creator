import React from 'react';
import renderer from 'react-test-renderer';
import HomeComponent from './App';

it('Testing Home Component', () => {
  const tree = renderer
    .create(<HomeComponent />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
