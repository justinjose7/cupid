import React, { Component } from 'react';
import LoginComponent from './LoginComponent'
import SignupComponent from './SignupComponent'
import CardStackComponent from './CardStackComponent'
import SurveyCardsComponent from './SurveyCardsComponent'
import { withRouter } from "react-router-dom";
import './css/LoginSignupComponent.css'

class LoginSignupComponent extends Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.loginAuthCheck = this.loginAuthCheck.bind(this) ;

        this.state = {
            showLogin: this.props.showLogin,
            showSignup: this.props.showSignup,
            showMainPage: this.props.showMainPage,
            showSurveyPage: this.props.showSurveyPage,
            username: '',
            password: '',
            new_username: '',
            email: '',
            new_password: '',
            fullname: '',
        };

        
    };
    
    updateState(key, value) {
        this.setState({ [key]: value});
    };

    loginAuthCheck() {
        
    };

    render() {
        const showProperComponent = () => {
            if (!this.state.showSignup) {
                return (
                    <LoginComponent
                        handleShowSignup={this.updateState}
                        handleChange={this.updateState}
                        username={this.state.username}
                        password={this.state.password}
                        history={this.props.history}

                    />
                );
            } else if (this.state.showSignup) {
                return (
                    <SignupComponent 
                        handleShowLogin={this.updateState}
                        handleSignup={this.updateState}
                        handleChange={this.updateState}
                        new_username={this.state.new_username}
                        new_password={this.state.new_password}
                        fullname={this.state.fullname}
                        email={this.state.email}

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

export default withRouter(LoginSignupComponent);
