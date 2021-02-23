import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <section className="footer" data-testid="footer">
      <a data-testid="drinks-bottom-btn" href="/bebidas" src={ drinkIcon }>
        <img src={ drinkIcon } alt="drink icon" />
      </a>
      <button
        className="header-button"
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore icon" />
      </button>
      <a data-testid="food-bottom-btn" href="/comidas" src={ mealIcon }>
        <img src={ mealIcon } alt="food icon" />
      </a>
    </section>
  );
}
export default Footer;
