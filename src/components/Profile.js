import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className="profile">
      <p data-testid="profile-email">{email && email.email}</p>
      <Link
        to="/receitas-feitas"
        data-testid="profile-done-btn"
        className="form-button"
      >
        Receitas Feitas
      </Link>
      <Link
        to="/receitas-favoritas"
        data-testid="profile-favorite-btn"
        className="form-button"
      >
        Receitas Favoritas
      </Link>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logOut }
      >
        Sair
      </button>
    </div>
  );
}

export default Profile;
