function ChecksUnited(itemId, setHideBtn, setIsFavorite) {
  const zero = 0;
  const checkForCompletion = () => {
    const list = JSON.parse(localStorage.getItem('doneRecipes'));
    if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
      setHideBtn('hidden');
    }
  };

  const checkFavorites = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
      setIsFavorite(true);
    }
  };
  checkFavorites();
  checkForCompletion();
}

export default ChecksUnited;
