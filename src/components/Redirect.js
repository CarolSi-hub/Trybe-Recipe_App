export default function RedirectToDone(itemId, mealType, details) {
  const dez = 10;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() < dez ? `0${today.getMonth()}` : today.getMonth();
  const day = today.getDate() < dez ? `0${today.getDate()}` : today.getDate();

  const item = {
    id: itemId,
    type: mealType === 'Meal' ? 'comida' : 'bebida',
    area: mealType === 'Meal' ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: mealType === 'Drink' ? details.strAlcoholic : '',
    name: details[`str${mealType}`],
    image: details[`str${mealType}Thumb`],
    doneDate: `${day}/${month}/${year}`,
    tags: details.strTags ? (details.strTags).split(',') : [],
  };

  const list = JSON.parse(localStorage.getItem('doneRecipes'));
  if (list) {
    list.push(item);
    localStorage.setItem('doneRecipes', JSON.stringify(list));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([item]));
  }
}
