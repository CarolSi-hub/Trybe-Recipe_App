import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title,
  hideSearchIcon,
  setFetch,
  setValueToFetch,
  getEndPointAndFetch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className="main-header">
      <div className="header">
        <a data-testid="profile-top-btn" href="/perfil" src={ profileIcon }>
          <img src={ profileIcon } alt="profile icon" />
        </a>
        <h1 className="page-title" data-testid="page-title">{title}</h1>
        {!JSON.parse(hideSearchIcon) && (
          <button
            className="header-button"
            data-testid="search-top-btn"
            type="button"
            src={ searchIcon }
            onClick={ () => setShowSearchBar(!showSearchBar) }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
        )}
      </div>
      {showSearchBar && (
        <div className="shearchTags">
          <input
            className="search-input"
            type="text"
            data-testid="search-input"
            id="search"
            name="search"
            placeholder="Digite Aqui"
            onChange={ (event) => setValueToFetch(event.target.value) }
          />
          <br />
          <label
            className="search-radio"
            htmlFor="ingredient"
          >
            Ingredient
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="search-option"
              value="ingredient"
              onClick={ (event) => setFetch(event.target.value) }
            />
          </label>
          <label
            className="search-radio"
            htmlFor="name"
          >
            Name
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="search-option"
              value="name"
              onClick={ (event) => setFetch(event.target.value) }
            />
          </label>
          <label
            className="search-radio"
            htmlFor="first-letter"
          >
            First Letter
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-letter"
              name="search-option"
              value="first-letter"
              onClick={ (event) => setFetch(event.target.value) }
            />
          </label>
          <button
            className="button-tag"
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => getEndPointAndFetch() }
          >
            Buscar
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hideSearchIcon: PropTypes.string.isRequired,
  setFetch: PropTypes.func.isRequired,
  setValueToFetch: PropTypes.func.isRequired,
  getEndPointAndFetch: PropTypes.func.isRequired,
};

export default Header;
