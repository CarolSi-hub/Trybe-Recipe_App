export default function FilterByType(type, setFinishedList) {
  let favList = JSON.parse(localStorage.getItem('doneRecipes'));
  if (type === 'all') {
    setFinishedList(favList);
  } else {
    favList = favList.filter((item) => item.type === type);
    setFinishedList(favList);
  }
}
