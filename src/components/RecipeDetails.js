import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  fetchDrinkDetailsById,
  fetchFoodDetailsById,
  fetchGlobalMeal,
  fetchGlobalDrink,
} from '../services/API';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardList from './CardList';
import checksUnited from './ChecksUnited';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({ itemId, mealType }) {
  const quinze = 15;
  const zero = 0;
  const tresMil = 3000;
  const history = useHistory();

  const [details, setDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [showMessage, setShowMessage] = useState('hidden');
  const [beginBtn, setBeginBtn] = useState('Iniciar');
  const [hideBtn, setHideBtn] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getRecommendation = async () => {
      let fetchRecommendation = [];
      if (mealType === 'Drink') fetchRecommendation = await fetchGlobalMeal();
      if (mealType === 'Meal') fetchRecommendation = await fetchGlobalDrink();
      if (fetchRecommendation) {
        fetchRecommendation.length = 6;
        await setRecommendation(fetchRecommendation);
      }
    };
    getRecommendation();
  }, [mealType]);

  useEffect(() => {
    const checkForProgress = () => {
      const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (list) {
        let keys = [];
        if (mealType === 'Meal') { keys = Object.keys(list.meals); } else {
          keys = Object.keys(list.cocktails);
        }
        if (keys.includes(itemId)) setBeginBtn('Continuar Receita');
      }
    };
    checkForProgress();
    checksUnited(itemId, setHideBtn, setIsFavorite);
  }, [itemId, mealType, recommendation, details]);
  useEffect(() => {
    const getDetails = async () => {
      let fromFetch = [];
      if (mealType === 'Drink') fromFetch = await fetchDrinkDetailsById(itemId);
      if (mealType === 'Meal') fromFetch = await fetchFoodDetailsById(itemId);
      if (fromFetch) setDetails(fromFetch[0]);
    };
    getDetails();
  }, [itemId, mealType, recommendation]);
  const forwardToInProgress = () => {
    let progressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressList === null) progressList = { cocktails: {}, meals: {} };
    if (mealType === 'Meal') progressList.meals[itemId] = [];
    else progressList.cocktails[itemId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressList));
    if (mealType === 'Meal') history.push(`/comidas/${itemId}/in-progress`);
    if (mealType === 'Drink') history.push(`/bebidas/${itemId}/in-progress`);
  };
  const loadIngredients = () => {
    const ingredientsList = [];
    for (let i = 1; i <= quinze; i += 1) {
      if (details[`strIngredient${i}`]) {
        ingredientsList.push({ ingredient: details[`strIngredient${i}`],
          measure: details[`strMeasure${i}`],
        });
      }
    }
    return (
      <ul type="none">
        {ingredientsList.map((item, index) => (
          <li
            key={ `ìngredient${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <img
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
              alt="ingredient"
            />
            {`${item.measure} - ${item.ingredient}`}
          </li>
        ))}
      </ul>
    );
  };
  const copyLink = () => {
    const url = window.location.href;
    copy(url);
    setShowMessage('');
    setTimeout(() => { setShowMessage('hidden'); }, tresMil);
  };
  const addToFavorites = () => {
    const data = {
      id: itemId,
      type: mealType === 'Meal' ? 'comida' : 'bebida',
      area: mealType === 'Meal' ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: mealType === 'Drink' ? details.strAlcoholic : '',
      name: details[`str${mealType}`],
      image: details[`str${mealType}Thumb`],
    };
    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favList) {
      if (favList.filter((item) => item.id === itemId).length > zero) {
        favList = favList.filter((item) => item.id !== itemId);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favList, data]));
      }
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([data]));
    }
  };
  const showDetails = () => (
    <div className="details">
      <img
        className="details-img-main"
        alt="Meal Thumbnail"
        width="100%"
        data-testid="recipe-photo"
        src={ details[`str${mealType}Thumb`] }
        tagName="img"
      />
      <h3
        className="detalhes-title"
        data-testid="recipe-title"
      >
        {details[`str${mealType}`]}
      </h3>
      <div className="detalhes-top">
        <h5 width="90%" data-testid="recipe-category">
          {
            mealType === 'Meal'
              ? details.strCategory
              : details.strAlcoholic
          }
          <p hidden={ showMessage }>Link copiado!</p>
        </h5>
        <span>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyLink() }
            className="icon-button"
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => addToFavorites() }
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            tabIndex="0"
            className="icon-button"
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heartIcon"
            />
          </button>
        </span>
      </div>
      { loadIngredients()}
      <p data-testid="instructions">{details.strInstructions}</p>
      {mealType === 'Meal'
        && (
          <iframe
            title="video"
            data-testid="video"
            src={ details.strYoutube && details.strYoutube.replace('watch?v=', 'embed/') }
            width="100%"
          />
        )}
      <CardList
        arrayOfCard={ recommendation }
        typeOfCard={ mealType === 'Meal' ? 'Drink' : 'Meal' }
        sideScroll=" sideScroll"
        recommendation="true"
      />
      <button
        className="form-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => forwardToInProgress() }
        hidden={ hideBtn }
      >
        {beginBtn}
      </button>
    </div>
  );
  return (
    <div>{showDetails()}</div>
  );
}

RecipeDetails.propTypes = {
  itemId: PropTypes.string.isRequired,
  mealType: PropTypes.string.isRequired,
};

export default RecipeDetails;
