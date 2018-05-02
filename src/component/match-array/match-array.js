import React, { Component } from 'react';
import '../../css/match-cards.css'
import {connect} from 'react-redux'
// import {loadData, getMatches} from '../../redux/user.redux'
import { match, getMatchArray } from '../../redux/match.redux'
import MatchArrayContainer from './match-array-container'

@connect(
    state=>state,
    {getMatchArray, }
)

class MatchArray extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.fillMatches = this.fillMatches.bind(this);
        this.state = {
            i: 0,
            loadedMatches: false,
        };

    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
        console.log(this.state)
    };


    updateState(key, value) {
        this.setState({ [key]: value});
    };


    fillMatches(userVal) {
      this.updateState('loadedMatches', true)
      // this.props.getMatches({user: userVal});
      this.props.getMatchArray({user:userVal});

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
                const payload_val = this.props.match.matches;
                const keys = Object.keys(payload_val);
                keys.forEach(function(key) {
                    matchArray = matchArray.concat([ payload_val[key] ]);
              });
              console.log(matchArray);

            }
            if (this.i != matchArray.length){
              return this.props.user? (
                <div >
                  <MatchArrayContainer />
                </div>
              ):null}
              return (
                <div className="no-cards-left">No matches. Start liking people who might like you back.</div>
              );

    }
}

export default MatchArray;
