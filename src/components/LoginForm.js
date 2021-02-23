import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const isDisable = () => {
    const passwordMinLength = 6;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validEmail = reg.test(email);
    const validPassword = password.length > passwordMinLength;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <form className="form">
      <h1 className="form-title">Sr. Forky</h1>
      <h4 className="form-subtitle">By Bons de Forky</h4>
      <p className="form-info">Explore, salve e compartilhe suas receitas favoritas!</p>
      <input
        className="form-input"
        data-testid="email-input"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        onChange={ (event) => setEmail(event.target.value) }
      />
      <input
        className="form-input"
        data-testid="password-input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={ (event) => setPassword(event.target.value) }
      />
      <button
        className="form-button"
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisable() }
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
