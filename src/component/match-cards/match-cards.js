import React, { Component } from 'react';
import '../../css/match-cards.css'
import {connect} from 'react-redux'
import {loadData, getMatches} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {getMatches}
)

class MatchCards extends Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.increment_i = this.increment_i.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.fillMatches = this.fillMatches.bind(this);
        this.state = {
            i: 0,
            loadedMatches: false,
        };

    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    };

    handleKeyPress (event) {
        switch(event.key) {
            case 'ArrowLeft':
                console.log('left swipe');
                this.increment_i();
                break;
            case 'ArrowRight':
                console.log('right swipe');
                this.increment_i();
                break;
            default:
                break;
        }
    };

    updateState(key, value) {
        this.setState({ [key]: value});
    };

    increment_i() {
            this.i++;
            this.updateState('i', this.i);

    }

    fillMatches(userVal) {
      this.updateState('loadedMatches', true)
      this.props.getMatches({user: userVal});
      console.log("did it work?")
      console.log(this.props.payload);

    }


    cardData = [
    { id: 1, name: 'Fred', age: 21, uri: 'https://cooper.edu/sites/default/files/fontaine1.jpg', distance: '5 miles away', description: 'Gaussian random variable'},
    { id: 2, name: 'Sam', age: 27, uri: 'http://cooper.edu/sites/default/files/keene1.jpg', distance: '10 miles away', description: 'Chill out...Easy right?' },
    { id: 3, name: 'Carl', age: 28, uri: 'https://res.cloudinary.com/dbormtzbg/image/upload/v1524193299/dskvjqgqigv8smdthp1g.jpg', distance: '3 miles away', description: 'Monkeys like bananas'},
    { id: 4, name: 'Brian', age: 30, uri: 'https://engfac.cooper.edu/photos/bailyn.jpg', distance: '6 miles away', description: 'The greatest ever'},
    ];

    i = 0;
    render() {
            let matchArray = [];

            if (this.props.user != '' && this.state.loadedMatches == false){
                console.log(this.props.user)
                this.fillMatches(this.props.user);
            }

            if (this.props.payload == null){
              return null;
            } else {
                console.log(this.props.payload)
                const payload_val = this.props.payload;
                const keys = Object.keys(payload_val);
                keys.forEach(function(key) {
                    matchArray = matchArray.concat([ payload_val[key] ]);
              });
              console.log(matchArray);

            }
            if (this.i != matchArray.length){
              return this.props.user? (
                  <div>
                      <div className="stack-container">
                          <div className="card-top">
                              <div className="img-card"><img className="img" src={matchArray[this.state.i].avatar} /></div>
                              <div className="name-header-card" ><b>{matchArray[this.state.i].name}</b></div>
                              <div className="text-card">{matchArray[this.state.i].distance} </div>
                              <div className="text-card"><i>{matchArray[this.state.i].desc}</i></div>

                          </div>
                          <div className="card-middle">{}</div>
                          <div className="card-bottom">{}</div>
                          <button className="card-button pass" onClick={() => {this.increment_i()}}>Pass</button>
                          <button className="card-button like" onClick={() => {this.increment_i()}}>Like</button>
                      </div>
                  </div>
              ):null}
              return (
                <div className="no-cards-left">No more people left...</div>
              );

    }
}

export default MatchCards;
