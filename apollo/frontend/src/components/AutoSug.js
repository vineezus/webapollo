import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Autosuggest from 'react-autosuggest';
    
// Teach Autosuggest how to calculate suggestions for any given input value.
// Função que vai ser chamada pra gettar os valores da lista pra mostrar como opção, de acordo com o que foi inputado

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => (`${suggestion.cidade}, ${suggestion.uf}`);

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {`${suggestion.cidade}, ${suggestion.uf}`}
  </div>
);

const AutoSug = (props) => {

  const { cities, getCities, idUpdate } = useContext(GlobalContext);

  useEffect(() => {
    getCities();
  }, []);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] =  useState([])

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : cities.filter(city =>
      city.cidade.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  const onSuggestionSelected = ( event, { suggestion }) => {
    idUpdate(suggestion.id)
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    if (value){
      setSuggestions(getSuggestions(value))
    } else{
      onSuggestionsClearRequested()
    }
    
  };

// Autosuggest will pass through all these props to the input.
  const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: onChange
  };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
}

export default AutoSug;