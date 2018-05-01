import React, { Component } from 'react';
import '../../css/match-cards.css'
import {connect} from 'react-redux'
// import {loadData, getMatches} from '../../redux/user.redux'
import { match, getMatchArray } from '../../redux/match.redux'
import MatchArrayContainer from './match-array-container'

@connect(
    state=>state,
    {getMatchArray}
)

class MatchArray extends React.Component {
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
      // this.props.getMatches({user: userVal});
      this.props.getMatchArray({user:userVal});
      console.log("did it work?")
      console.log(this.props.payload);

    }
    i=0
    render() {
            let matchArray = [];

            console.log(this.props)

            if (this.props.user.user != '' && this.state.loadedMatches == false){
                console.log(this.props.user.user)
                this.fillMatches(this.props.user.user);
            }
            console.log(this.props)
            if (this.props.match == null){
              return null;
            } else {
                console.log(this.props.match)
                const payload_val = this.props.match;
                const keys = Object.keys(payload_val);
                keys.forEach(function(key) {
                    matchArray = matchArray.concat([ payload_val[key] ]);
              });
              console.log(matchArray);

            }
            if (this.i != matchArray.length){
              return this.props.user? (
                <div style= {{paddingTop:'25px'}}>
                  <MatchArrayContainer />
                </div>
                  // <div>
                  //     <div className="stack-container">
                  //         <div className="card-top">
                  //             <div className="img-card"><img className="img" src={matchArray[this.state.i].avatar} /></div>
                  //             <div className="name-header-card" ><b>{matchArray[this.state.i].name}</b></div>
                  //             <div className="text-card">{matchArray[this.state.i].distance} </div>
                  //             <div className="text-card"><i>{matchArray[this.state.i].desc}</i></div>
                  //
                  //         </div>
                  //         <div className="card-middle">{}</div>
                  //         <div className="card-bottom">{}</div>
                  //         <button className="card-button pass" onClick={() => {this.increment_i()}}>Pass</button>
                  //         <button className="card-button like" onClick={() => {this.increment_i()}}>Like</button>
                  //     </div>
                  // </div>
              ):null}
              return (
                <div className="no-cards-left">Lol u got no frens...</div>
              );

    }
}

export default MatchArray;
