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
                <h1><img src="/logo_black.png" alt="logo app"/></h1>
                <p>User Login</p>
                <LoginForm/>
            </LandingLayout>
        );
    }
}

export default LoginPage
