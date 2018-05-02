import React, { Component } from 'react';
import './css/CardStackComponent.css'


class MyProfile extends Component {
    constructor(props) {
        super(props);
    };

    updateState(key, value) {
        this.setState({ [key]: value});
    };

    render() {
          return (
                  <div className="stack-container card">
                      <div className="card-top card">
                          <div className="img-card"><img className="img" src={this.cardData[this.state.i].uri} /></div>
                          <div className="name-header-card" ><b>{this.cardData[this.state.i].name}</b>, {this.cardData[this.state.i].age}</div>
                          <div className="text-card">{this.cardData[this.state.i].distance} </div>
                          <div className="text-card"><i>"{this.cardData[this.state.i].description}"</i></div>

                      </div>
                      <div className="card-middle card">{}</div>
                      <div className="card-bottom card">{}</div>
                      <button className="card-button pass" onClick={() => {this.increment_i()}}>Pass</button>
                      <button className="card-button like" onClick={() => {this.increment_i()}}>Like</button>
                  </div>
          );
        }
}

export default MyProfile;
