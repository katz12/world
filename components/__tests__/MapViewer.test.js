import React from 'react';
import MapViewer from '../MapViewer';
import { shallow, mount } from 'enzyme';

// todo: React Hooks does not support shallow render yet.
// Enable this when it does. (https://github.com/facebook/react/issues/14091)
it.skip('should render', () => {
  expect(shallow(<MapViewer />)).toMatchSnapshot()
})

// todo: React Hooks does not support shallow render yet.
// Enable this when it does. (https://github.com/facebook/react/issues/14091)
it.skip('should pass the selected country code to CountryDetail', () => {
  const wrapper = shallow(<MapViewer />);

  const event = {};
  const country = 'US';
  wrapper.find('VectorMap').prop('onRegionClick')(event, country);
  expect(wrapper.find('CountryDetail').prop('selectedCountryCode')).toBe(country);
})
