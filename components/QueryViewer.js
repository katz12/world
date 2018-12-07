import React, { useState, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';

import QueryEditor from './QueryEditor'
import QueryResult from './QueryResult';
import { query as Query } from '../api/dbpedia';

const QueryViewer = ({ initialQuery, countryResource }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (running) {
      setError(null);
      setResults(null);
      Query(query)
        .then(setResults).then(() => setRunning(false))
        .catch((e) => {
          setError(e.message);
          setRunning(false)
        });
    }
  }, [running])

  return (
    <div>
      <Header as='h3'>Query</Header>
      <Form>
        <Form.Field>
          <QueryEditor query={query} onQueryChange={query => setQuery(query)} countryResource={countryResource} />
        </Form.Field>
        <Form.Button primary loading={running} onClick={() => setRunning(true)}>
          Run
        </Form.Button>
      </Form>

      <Header as='h3'>Results</Header>
      <QueryResult results={results} error={error} />
    </div>
  )
};

export default QueryViewer;
