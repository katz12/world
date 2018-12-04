import React from 'react';
import CountryDetail from '../CountryDetail';
import { shallow } from 'enzyme';

it('should render with props', () => {
  expect(shallow(<CountryDetail selectedCountryCode="US" />).debug()).toMatchSnapshot()
})

it ('should not render without props', () => {
  expect(shallow(<CountryDetail />).debug()).toMatchSnapshot()
})
