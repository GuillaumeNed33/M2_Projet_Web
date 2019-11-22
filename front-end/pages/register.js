import React from 'react'
import LandingLayout from "../components/landing-layout";
import RegisterForm from "../components/register-form";

class RegisterPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <LandingLayout>
          <RegisterForm/>
        </LandingLayout>
    );
  }
}


export default RegisterPage
