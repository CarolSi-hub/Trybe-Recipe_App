import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchRamdonDrink, fetchRamdonFood } from '../services/API';

function ExplorarSearchBar({ hideAreaButton, mealType }) {
  const history = useHistory();
  const redirectTo = (searchType) => {
    history.push(`/explorar/${mealType}/${searchType}`);
  };

  const getRamdomRecipe = async () => {
    let recipe = [];
    if (mealType === 'comidas') recipe = await fetchRamdonFood();
    if (mealType === 'bebidas') recipe = await fetchRamdonDrink();
    const mealTypeChain = mealType === 'comidas' ? 'Meal' : 'Drink';
    const recipeObject = recipe[0];
    const itemId = recipeObject[`id${mealTypeChain}`];
    history.push(`/${mealType}/${itemId}`);
  };

  return (
    <div className="navbar">
      <button
        className="navbar-button"
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => redirectTo('ingredientes') }
      >
        Por Ingredientes
      </button>
      {!JSON.parse(hideAreaButton)
           && (
             <button
               className="navbar-button"
               data-testid="explore-by-area"
               type="button"
               onClick={ () => redirectTo('area') }
             >
               Por Local de Origem
             </button>
           )}

      <button
        className="navbar-button"
        data-testid="explore-surprise"
        type="button"
        onClick={ () => getRamdomRecipe() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExplorarSearchBar.propTypes = {
  hideAreaButton: PropTypes.bool.isRequired,
  mealType: PropTypes.string.isRequired,
};

export default ExplorarSearchBar;
