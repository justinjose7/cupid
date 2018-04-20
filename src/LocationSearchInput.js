import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './css/LocationSearchInput.css'
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { address: '' }
  }
 
  handleChange = (address) => {
    this.setState({ address })
  }
 
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'City or home address',
                className: 'search-input-form'
              })}
            />
            <div className="autocomplete-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;