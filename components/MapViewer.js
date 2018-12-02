import React from 'react';
import { useState } from 'react';
import { VectorMap } from 'react-jvectormap';

import CountryDetail from './CountryDetail';

const MapViewer = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  return (
    <div>
      <VectorMap
        map='world_mill'
        zoomOnScroll={false}
        regionsSelectable={true}
        regionsSelectableOne={true}
        onRegionClick={(_e, code) => setSelectedCountryCode(code)}
        containerStyle={{
          width: '100%',
          height: 500
        }}
       />
       <CountryDetail selectedCountryCode={selectedCountryCode} />
    </div>
  )
};

export default MapViewer;
