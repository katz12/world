import React from 'react';

const QueryResult = ({ results }) => {
  if (results == null) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          { results.head.vars.map((v, i) => <td key={i}>{v}</td>) }
        </tr>
      </thead>
      <tbody>
        { results.results.bindings.map((binding, i) =>
          <tr key={i}>
            { results.head.vars.map((v, i) =>
              <td key={i}>
              {binding[v]
                ? binding[v].value
                : 'Value unavailable'
              }
              </td>
            ) }
          </tr>
        ) }
      </tbody>
    </table>
  )
};

export default QueryResult;
