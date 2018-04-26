import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import '../../css/location-search-input.css'
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { 
      address: '',
      latLng: '',
     }
  }
 
  handleChange = (address) => {
    this.setState({ 
      'address': address,
     })
  }
  
  handleLatLng = (latLng) => {
    this.setState({ 
      'latLng ': latLng,
     })
    this.props.callBackGetLatLng(latLng);
  }


  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.handleLatLng(latLng))
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