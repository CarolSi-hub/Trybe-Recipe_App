export default function GetListFromLocal(setFinishedList) {
  const list = JSON.parse(localStorage.getItem('doneRecipes'));
  if (list) setFinishedList(list);
}
