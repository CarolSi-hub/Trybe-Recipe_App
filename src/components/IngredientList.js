import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function IngredientesList({ mealType, requiredIngredients }) {
  requiredIngredients.length = 12;
  const history = useHistory();

  const pathType = mealType === 'Meal' ? 'comidas' : 'bebidas';

  const goToMainByIngredient = (pathName, ingredient) => {
    history.push({ pathname: pathName, state: ingredient });
  };

  return (
    <div className="ingredients-list">
      { requiredIngredients.map((item, index) => (
        <div
          key={ index }
        >
          <button
            className="item-ingredients"
            data-testid={ `${index}-ingredient-card` }
            type="button"
            onClick={ () => goToMainByIngredient(`/${pathType}`, (mealType === 'Meal'
              ? `${item.strIngredient}`
              : `${item.strIngredient1}`)) }
          >
            <img
              src={
                mealType === 'Meal'
                  ? `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png`

              }
              alt="ingredient"
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>
              {
                mealType === 'Meal'
                  ? `${item.strIngredient}`
                  : `${item.strIngredient1}`
              }
            </h3>
          </button>
        </div>
      ))}
    </div>

  );
}

IngredientesList.propTypes = {
  mealType: PropTypes.string.isRequired,
  requiredIngredients: PropTypes.string.isRequired,
};

export default IngredientesList;
