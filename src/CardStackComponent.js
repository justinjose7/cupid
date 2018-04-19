import React, { Component } from 'react';
import './css/CardStackComponent.css'


class CardStackComponent extends Component {
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
            console.log(this.cardData.length)
        }

    }

    cardData = [
    { id: 1, name: 'Fred', age: 21, uri: 'https://cooper.edu/sites/default/files/fontaine1.jpg', distance: '5 miles away', description: 'Gaussian random variable'},
    { id: 2, name: 'Sam', age: 27, uri: 'http://cooper.edu/sites/default/files/keene1.jpg', distance: '10 miles away', description: 'Chill out...Easy right?' },
    { id: 3, name: 'Carl', age: 28, uri: 'https://cooper.edu/sites/default/files/sable1.jpg', distance: '3 miles away', description: 'Monkeys like bananas'},
    { id: 4, name: 'Brian', age: 30, uri: 'https://engfac.cooper.edu/photos/bailyn.jpg', distance: '6 miles away', description: 'The greatest ever'},
    ];

    i = 0;
    render() {
        if (this.i != this.cardData.length){
            return (
                <div> 
                    <div className="stack-container">
                        <div className="card-top">
                            <div className="img-card"><img className="img" src={this.cardData[this.state.i].uri} /></div>
                            <div className="name-header-card" ><b>{this.cardData[this.state.i].name}</b>, {this.cardData[this.state.i].age}</div>
                            <div className="text-card">{this.cardData[this.state.i].distance} </div>
                            <div className="text-card"><i>"{this.cardData[this.state.i].description}"</i></div>
                        
                        </div>
                        <div className="card-middle">{}</div>
                        <div className="card-bottom">{}</div>
                        <button className="card-button pass" onClick={() => {this.increment_i()}}>Pass</button>
                        <button className="card-button like" onClick={() => {this.increment_i()}}>Like</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="no-cards-left">No more people left...</div>
            );
    }
}

export default CardStackComponent;
