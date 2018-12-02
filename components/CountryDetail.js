import React from 'react';

import QueryViewer from './QueryViewer';
import { getPopulationQuery, countryCodeMap } from '../api/dbpedia';

const CountryDetail = ({ selectedCountryCode }) => {
  if (!selectedCountryCode) {
    return null;
  } else {
    return (
      <div>
        <h1>
          Querying data from: {countryCodeMap[selectedCountryCode]}
        </h1>
        <QueryViewer key={selectedCountryCode} initialQuery={getPopulationQuery(selectedCountryCode)} />
      </div>
    )
  }
}

export default CountryDetail;
