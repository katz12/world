import React from 'react';
import { Table } from 'semantic-ui-react';

const QueryResult = ({ results }) => {
  if (results == null) {
    return null;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          { results.head.vars.map((v, i) =>
            <Table.HeaderCell key={i}>{v}</Table.HeaderCell>
          ) }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { results.results.bindings.map((binding, i) =>
          <Table.Row key={i}>
            { results.head.vars.map((v, i) =>
              <Table.Cell key={i}>
              {binding[v]
                ? binding[v].value
                : 'Value unavailable'
              }
              </Table.Cell>
            ) }
          </Table.Row>
        ) }
      </Table.Body>
    </Table>
  )
};

export default QueryResult;
