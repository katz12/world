import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import QueryViewer from './QueryViewer';
import { getPopulationQuery, countryCodeMap } from '../api/dbpedia';

const CountryDetail = ({ selectedCountryCode }) => {
  if (!selectedCountryCode) {
    return null;
  } else {
    return (
      <Container>
        <Header as='h2' dividing style={{marginTop: '1em'}}>
          Querying data from: {countryCodeMap[selectedCountryCode]}
        </Header>
        <QueryViewer key={selectedCountryCode} initialQuery={getPopulationQuery(selectedCountryCode)} />
      </Container>
    )
  }
}

export default CountryDetail;
