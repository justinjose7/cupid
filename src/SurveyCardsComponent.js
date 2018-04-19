import React, { Component } from 'react';
import './css/SurveyCardsComponent.css'


class SurveyCardsComponent extends Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.increment_i = this.increment_i.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            i: 0,
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
        if (this.i < this.cardData.length){
            this.i++;
            this.updateState('i', this.i);
        }

    }

    cardData = [
    { question: "Do you enjoy sports?"},
    { question: "Do you enjoy politics?"},
    { question: "Are you a fan of pop music?"},
    { question: "Are you a night-owl?"},
    ];

    i = 0;
    render() {
        if (this.i != this.cardData.length){
            return (
                <div> 
                    <div className="stack-container">
                        <div className="card-top">
                            <div className="text-card-this">{this.cardData[this.state.i].question} </div>
                        </div>
                        <div className="card-middle">{}</div>
                        <div className="card-bottom">{}</div>
                        <button className="card-button pass" onClick={() => {this.increment_i()}}>No</button>
                        <button className="card-button like" onClick={() => {this.increment_i()}}>Yes</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="nothing-left">No more cards left</div>
            );
    }
}

export default SurveyCardsComponent;
