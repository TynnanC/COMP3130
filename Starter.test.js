import React from 'react';
import renderer from 'react-test-renderer';
import UserHomeList from './app/components/UserHomeList.js';

test('UserHomeList renders correctly', () => {
    const tree = renderer.create(<UserHomeList />).toJSON();
    expect(tree).toMatchSnapshot();
});