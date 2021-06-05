import React from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom';


export const LandingPage = () => {
    return (
        <div id="landing-page-main-background">
            <div id="landing-page-buttons-area">
                <Link to="/log-in">
                    <button id="landing-page-login-button" className="landing-page-main-buttons">
                            Login
                    </button>
                </Link>
                <Link to="sign-up">
                    <button id="landing-page-signup-button" className="landing-page-main-buttons">
                            Sign Up
                    </button>
                </Link>
            </div>
        </div>
    )
}
