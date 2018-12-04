import React from 'react';
import { useState, useEffect } from 'react';
import { Header, Form, TextArea } from 'semantic-ui-react';

import QueryResult from './QueryResult';
import { query as Query } from '../api/dbpedia';

const QueryViewer = ({ initialQuery }) => {
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
        <TextArea value={query}/>
      </Form>

      <Header as='h3'>Results</Header>
      <QueryResult results={results} error={error} />
    </div>
  )
};

export default QueryViewer;
