export default function ingredientsAndFavorites(
  itemId,
  mealTypeChain,
  setIngredientsList,
  setIsFavorite,
) {
  const zero = 0;
  const checkedIngredients = async () => {
    const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (list) {
      const ingredients = list[mealTypeChain][itemId];
      setIngredientsList(ingredients);
    }
  };

  const checkFavorites = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
      setIsFavorite(true);
    }
  };
  checkedIngredients();
  checkFavorites();
}
