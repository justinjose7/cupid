import React, { Component } from 'react';
import axios from 'axios'
import '../../css/match-cards.css'
import {connect} from 'react-redux'
import {loadData, getMatches} from '../../redux/user.redux'
import { Toast } from 'antd-mobile'


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
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);

        this.state = {
            i: 0,
            loadedMatches: false
        };
        this.matchArray = []

    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    };

    handleKeyPress (event) {
        switch(event.key) {
            case 'ArrowLeft':
                console.log('left swipe');
                this.dislike();
                break;
            case 'ArrowRight':
                console.log('right swipe');
                this.like()

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

    like() {
      axios.put('/user/confirmMatch',{ user: this.props.user, match: {
        user: this.matchArray[this.i].user,
        resp: true
      }})

      this.increment_i();

    }

    dislike() {
      axios.put('/user/confirmMatch',{ user: this.props.user, match: {
        user: this.matchArray[this.i].user,
        resp: false
      }})

      this.increment_i();
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
            // let matchArray = [];

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
                this.matchArray = []
                const ourFunc = function(key) {
                    this.matchArray = this.matchArray.concat([ payload_val[key] ]);
              };
                keys.forEach(ourFunc.bind(this));
              console.log(this.matchArray);

            }
            if (this.i < this.matchArray.length){
              return this.props.user? (
                  <div>
                      <div className="stack-container">
                          <div className="card-top">
                              <div className="img-card"><img className="img" src={this.matchArray[this.state.i].avatar} /></div>
                              <div className="name-header-card" ><b>{this.matchArray[this.state.i].name}</b></div>
                              <div className="text-card">{Math.round(this.matchArray[this.state.i].dist)} miles away</div>
                              <div className="text-card"><i>{this.matchArray[this.state.i].desc}</i></div>

                          </div>
                          <div className="card-middle">{}</div>
                          <div className="card-bottom">{}</div>
                          <button className="card-button pass" onClick={() => {this.dislike()}}>Pass</button>
                          <button className="card-button like" onClick={() => {this.like()}}>Like</button>
                      </div>
                  </div>
              ):null}
              window.removeEventListener("keydown", this.handleKeyPress);
              return (
                <div className="no-cards-left">No more people left...</div>
              );

    }
}

export default MatchCards;
