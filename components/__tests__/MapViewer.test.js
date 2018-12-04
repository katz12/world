import React from 'react';
import MapViewer from '../MapViewer';
import { shallow } from 'enzyme';

// todo: React Hooks does not support shallow render yet.
// Enable this when it does. (https://github.com/facebook/react/issues/14091)
it.skip('should render', () => {
  expect(shallow(<MapViewer />)).toMatchSnapshot()
})
