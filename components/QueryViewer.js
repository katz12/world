import React from 'react';
import { useState, useEffect } from 'react';

import QueryResult from './QueryResult';
import { query as Query } from '../api/dbpedia';

const QueryViewer = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);

  useEffect(() => {
    Query(query).then(setResults)
  }, [query])

  return (
    <div>
      <h2>Query:</h2>
      <textarea value={query}/>

      <h2>Results:</h2>
      <QueryResult results={results} />
    </div>
  )
};

export default QueryViewer;
