const quinze = 15;
const zero = 0;
const tresMil = 3000;

export const filteredList = (value, list) => list.filter((item) => item !== value);

export const getIngredients = (details) => {
  const ingredientsList = [];
  for (let i = 1; i <= quinze; i += 1) {
    if (details[`strIngredient${i}`]) {
      ingredientsList.push({
        ingredient: details[`strIngredient${i}`],
        measure: details[`strMeasure${i}`],
      });
    }
  }
  return ingredientsList;
};

export const enableButton = (setDisableButton, stateList, mealType, itemId) => {
  console.log('chamou');
  console.log(stateList.length, 'statelist');
  const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const checkedIngredients = list[mealType][itemId];
  console.log(checkedIngredients.length, 'checkedingred');
  if (stateList.length === checkedIngredients.length) setDisableButton(false);
};

export const checkOut = (value, mealType, itemId) => {
  const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (list) {
    if (list[mealType][itemId].includes(value)) {
      const filteredListToSave = filteredList(value, list[mealType][itemId]);
      list[mealType][itemId] = filteredListToSave;
      localStorage.setItem('inProgressRecipes', JSON.stringify(list));
    } else {
      list[mealType][itemId].push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(list));
    }
  } else {
    const newList = {
      cocktails: {
      },
      meals: {
      },
    };
    newList[mealType][itemId] = [value];
    localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
  }
};

const copy = require('clipboard-copy');

export const copyLink = (url, setShowMessage) => {
  const replacedUrl = url.replace('/in-progress', '');
  copy(replacedUrl);
  setShowMessage('');
  setTimeout(() => { setShowMessage('hidden'); }, tresMil);
};

export const addToFavorites = (itemId, mealType, details, setIsFavorite) => {
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
    console.log('entrou');
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

export function checkFavorites(itemId, setIsFavorite) {
  const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
    setIsFavorite(true);
  }
}
