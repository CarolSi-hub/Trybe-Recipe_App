import React from 'react';
import LoginForm from '../components/LoginForm';
import Forkinho from '../images/Forkinho.jpeg';

function Login() {
  return (
    <div className="form-page">
      <img className="img-login" src={ Forkinho } alt="Foky toy" />
      <LoginForm />
    </div>
  );
}

export default Login;
