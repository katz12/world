import React, { useState, useEffect } from 'react';

import { TextArea, Dropdown } from 'semantic-ui-react';
import getCaretCoordinates from 'textarea-caret-position';

import { query as Query, getCountryPropertiesQuery } from '../api/dbpedia'

const QueryEditor = ({ query, onQueryChange, countryResource }) => {
  const [suggestionsCoordinates, setSuggestionsCoordinates] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [matchingProperties, setMatchingProperties] = useState([]);
  const [wordToReplace, setWordToReplace] = useState('');

  useEffect(() => {
    const seen = {};
    Query(getCountryPropertiesQuery(countryResource))
    .then(data => {
      const properties = data.results.bindings.map(
        binding => ({ key: binding.property.value, text: binding.property.value })
      ).filter((val) => {
        if (!seen[val.key]) {
          seen[val.key] = 1;
          return true;
        } else {
          return false;
        }
      });
      setAvailableProperties(properties);
    })
  }, [countryResource]);

  const findWord = (cursor, value) => {
    const stopValues = [' ', '{', '}'];

    let wordStart = cursor;
    while (wordStart > 0 && !stopValues.includes(value.charAt(wordStart - 1))) {
      wordStart--;
    }

    let wordEnd = cursor;
    while (wordEnd < value.length && !stopValues.includes(value.charAt(wordEnd))) {
      wordEnd++;
    }

    return value.substring(wordStart, wordEnd);
  }

  const onChange = (e) => {
    const suggestionsCoordinates = new getCaretCoordinates(e.target).get(e.target.selectionStart, e.target.selectionEnd);
    suggestionsCoordinates.top +=20;
    setSuggestionsCoordinates(suggestionsCoordinates);

    const word = findWord(e.target.selectionStart, e.target.value);
    setWordToReplace(word);
    setMatchingProperties(
      availableProperties.filter(prop => {
        const regex = new RegExp(`.*${word}.*`, 'g')
        return prop.text.match(regex)
      }).map(prop => ({ ...prop, onClick: onDropdownSelect }))
    );
    setShowSuggestions(true);

    onQueryChange(e.target.value);
  }

  const onDropdownSelect = (e, data) => {
    onQueryChange(query.replace(wordToReplace, `<${data.text}>`));
    setShowSuggestions(false);
  }

  return (
    <div>
      <TextArea
        value={query}
        autoHeight={true}
        onChange={onChange}
      />
      <Dropdown trigger={<div/>} style={{position: 'absolute', ...suggestionsCoordinates}}
                icon={null} open={showSuggestions} options={matchingProperties} />
    </div>
  )
}

export default QueryEditor;
