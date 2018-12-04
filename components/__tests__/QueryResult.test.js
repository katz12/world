import React from 'react';
import QueryResult from '../QueryResult';
import { shallow } from 'enzyme';

const exampleResult = {
  "head": { "link": [], "vars": ["populationTotal"] },
  "results": {
    "distinct": false,
    "ordered": true,
    "bindings": [{
      "populationTotal": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
        "value": "13670084" }
      }]
    }
  }

it('should render with result', () => {
  expect(shallow(<QueryResult results={exampleResult} />).debug()).toMatchSnapshot()
})

it ('should render with error', () => {
  expect(shallow(<QueryResult error={'There was an error'} />).debug()).toMatchSnapshot()
})

it ('should render error before result', () => {
  expect(shallow(<QueryResult error={'There was an error'} results={exampleResult} />).debug()).toMatchSnapshot()
})

it ('should not render without props', () => {
  expect(shallow(<QueryResult />).debug()).toMatchSnapshot()
})
