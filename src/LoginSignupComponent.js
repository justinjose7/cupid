import React, { Component } from 'react';
import LoginComponent from './LoginComponent'
import SignupComponent from './SignupComponent'
import CardStackComponent from './CardStackComponent'
import SurveyCardsComponent from './SurveyCardsComponent'
import './LoginSignupComponent.css'


class LoginSignupComponent extends Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);

        this.state = {
            showLogin: this.props.showLogin,
            showSignup: this.props.showSignup,
            showMainPage: this.props.showMainPage,
            showSurveyPage: this.props.showSurveyPage,
        };

        
    };
    
    updateState(key, value) {
        this.setState({ [key]: value});
    };

    render() {
        const showProperComponent = () => {
            if (!this.state.showSignup) {
                return (
                    <LoginComponent
                        handleShowSignup={this.updateState}
                        handleLogin={this.updateState}
                    />
                );
            } else if (this.state.showSignup) {
                return (
                    <SignupComponent 
                        handleShowLogin={this.updateState}
                        handleSignup={this.updateState}
                    />
                );
            }
        }
        if (this.state.showMainPage){
            return (
                <CardStackComponent/>
            );
        }
        if (this.state.showSurveyPage){
            return (
                <SurveyCardsComponent/>
            );
        }
        return (
            <div>
            {showProperComponent()}
            </div>
        );
    }
}

export default LoginSignupComponent;
