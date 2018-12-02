import React from 'react';
import { useState, useEffect } from 'react';
import { Header, Form, TextArea } from 'semantic-ui-react';

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
      <Header as='h3'>Query</Header>
      <Form>
        <TextArea value={query}/>
      </Form>

      <Header as='h3'>Results</Header>
      <QueryResult results={results} />
    </div>
  )
};

export default QueryViewer;
