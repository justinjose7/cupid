import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import { Toast } from 'antd-mobile'
import '../../css/surveyCards.css'

@connect(
  state=>state.user,
    {update}
)

class SurveyCards extends Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.like = this.like.bind(this);
        this.reject = this.reject.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.surveyFinished = this.surveyFinished.bind(this);
        this.state = {
            i: 0,
            interests: {
                sports: false,
                politics: false,
                food: false,
                popmusic: false,
                rap: false,
                religion: false,
            },
            currentInterest: 'sports',
            surveyComplete: false,
        };


    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    };

    handleKeyPress (event) {
        switch(event.key) {
            case 'ArrowLeft':
                console.log('left swipe');
                this.reject();
                break;
            case 'ArrowRight':
                console.log('right swipe');
                this.like();
                break;
            default:
                break;
        }
    };

    reject(){
        this.setState({ interests: {...this.state.interests, [this.state.currentInterest]: false}});
        Toast.info('No', 0.7);


        if (this.i < this.cardData.length){
            this.i++;
            this.updateState('i', this.i);
        }

        console.log(this.state.interests)
        if (this.i < this.cardData.length)
          this.updateState('currentInterest', this.cardData[this.state.i].interest)

          if (this.i == this.cardData.length){
            this.setState({surveyComplete: true});
          }
          else {
            this.setState({surveyComplete: true});
          }
    }

    like(){
        this.setState({ interests: {...this.state.interests, [this.state.currentInterest]: true}});
        Toast.info('Yes', 0.5);


        if (this.i < this.cardData.length){
            this.i++;
            this.updateState('i', this.i);
        }

        console.log(this.state.interests)
        if (this.i < this.cardData.length){
          this.updateState('currentInterest', this.cardData[this.state.i].interest)
        }
        else {
          this.setState({surveyComplete: true});
        }
    }

    updateState(key, value) {
        this.setState({ [key]: value});
    };


    cardData = [
    { interest: 'sports', question: "Do you enjoy sports?"},
    { interest: 'politics', question: "Do you enjoy politics?"},
    { interest: 'popmusic', question: "Are you a fan of pop music?"},
    { interest: 'food', question: "Are you a foodie?"},
    ];

    i = 0;

    surveyFinished(){
      window.removeEventListener("keydown", this.handleKeyPress);
      this.props.update(this.state)

    }
    render() {
        if (this.i != this.cardData.length){
            return (
                <div>
                  <div id="nav-bar">
                      <a className="nav-item" id ="cupid-logo" href="/nearby">Cupid</a>
                  </div>
                    <div className="stack-container">
                        <div className="card-top card">
                            <div className="text-card-this">{this.cardData[this.state.i].question} </div>
                        </div>
                        {this.cardData[this.state.i+1]?(
                          <div className="card-middle card">{}</div>
                        ):null
                        }
                        {this.cardData[this.state.i+2]?(
                          <div className="card-bottom card">{}</div>
                        ):null
                        }
                        <div className="swipeDiv">
                          <button className="card-button pass" onClick={() => {this.dislike()}}>No</button>
                          <button className="card-button like" onClick={() => {this.like()}}>Yes</button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
              <div id="nav-bar">
                  <a className="nav-item" id ="cupid-logo" href="/nearby">Cupid</a>
              </div>
                    <div className="nothing-left" {...this.surveyFinished()}>No more cards left</div>
                    <Redirect to='/nearby' />
            </div>

            );
    }
}

export default SurveyCards;
