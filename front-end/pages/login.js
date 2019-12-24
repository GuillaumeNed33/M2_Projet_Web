import React from 'react'
import LandingLayout from "../components/landing-layout";
import LoginForm from "../components/login-form"

class LoginPage extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <LandingLayout>
                <h1>MOVIE APP</h1>
                <p>Connexion de l'utilisateur</p>
                <LoginForm/>
            </LandingLayout>
        );
    }
}

export default LoginPage
