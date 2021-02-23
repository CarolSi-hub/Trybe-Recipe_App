import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import CategoryBar from '../components/CategoryBar';
import { fetchGlobalDrink,
  fetchDrinkCategory,
  fetchDrinkByCategory,
  fetchDrinkByIngredients,
  fetchDrinkByName,
  fetchDrinksByFirstLetter } from '../services/API';

function Bebidas() {
  const [globalDrink, setGlobalDrink] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [typeOfFetch, setFetch] = useState('');
  const [valueToFetch, setValueToFetch] = useState('');
  const [filteredBySearchBar, setFilteredBySearchBar] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);

  const noFindRecipe = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const magicNumberZero = 0;
  const location = useLocation();
  const history = useHistory();

  const redirectToDetails = () => {
    if (dataToRender.length === 1) history.push(`/bebidas/${dataToRender[0].idDrink}`);
  };

  const showAlert = (message) => {
    alert(message);
  };

  const getEndPointAndFetch = async () => {
    setFilteredByCategory([]);
    switch (typeOfFetch) {
    case 'ingredient': {
      const fetchValue = await fetchDrinkByIngredients(valueToFetch);
      return fetchValue ? setFilteredBySearchBar(fetchValue) : showAlert(noFindRecipe);
    }
    case 'name': {
      const fetchValue = await fetchDrinkByName(valueToFetch);
      return fetchValue ? setFilteredBySearchBar(fetchValue) : showAlert(noFindRecipe);
    }
    case 'first-letter': {
      if (valueToFetch.length === 1) {
        const fetchValue = await fetchDrinksByFirstLetter(valueToFetch);
        if (fetchValue) {
          setFilteredBySearchBar(fetchValue);
        } if (!fetchValue) {
          showAlert(noFindRecipe);
        }
      } else if (valueToFetch !== 1) {
        showAlert('Sua busca deve conter somente 1 (um) caracter');
      }

      break;
    }
    default: {
      return fetchGlobalDrink();
    }
    }
  };

  const getGlobalDrinkData = async () => {
    const data = await fetchGlobalDrink();
    setGlobalDrink(data);
  };

  const getCategoriesDrinkData = async () => {
    const data = await fetchDrinkCategory();
    setDrinkCategories(data);
  };

  useEffect(() => {
    getEndPointAndFetch();
  }, [typeOfFetch]);
  useEffect(() => {
    function getWhatToRender() {
      if (location.state !== undefined) {
        setValueToFetch(location.state);
        setFetch('ingredient');
      } else {
        console.log('entrou no else');
        getGlobalDrinkData();
      }
    }
    getWhatToRender();
    getCategoriesDrinkData();
  }, []);

  useEffect(() => {
    async function getDrinksByCategory() {
      const data = await fetchDrinkByCategory(category);
      const dataDrinks = data;
      if (dataDrinks.length > magicNumberZero) setFilteredByCategory(dataDrinks);
    }
    getDrinksByCategory();
  }, [category]);

  useEffect(() => {
    const dataToRenderFunction = () => {
      if ((filteredByCategory.length === magicNumberZero || category === '')
        && (filteredBySearchBar.length === magicNumberZero || valueToFetch === '')) {
        return setDataToRender(globalDrink);
      } if (filteredByCategory.length > magicNumberZero) {
        return setDataToRender(filteredByCategory);
      } if (filteredBySearchBar.length > magicNumberZero) {
        return setDataToRender(filteredBySearchBar);
      }
    };
    dataToRenderFunction();
  }, [category, filteredByCategory, filteredBySearchBar, globalDrink, valueToFetch]);

  return (
    <div>
      <Header
        title="Bebidas"
        hideSearchIcon="false"
        setFetch={ setFetch }
        setValueToFetch={ setValueToFetch }
        getEndPointAndFetch={ getEndPointAndFetch }
      />
      {!redirectToDetails()
      && <CategoryBar
        arrayOfCategories={ drinkCategories }
        typeOfCategory="Drink"
        setCategory={ setCategory }
        category={ category }
      />}
      <CardList
        arrayOfCard={ dataToRender }
        typeOfCard="Drink"
        sideScroll=""
      />
      <Footer />
    </div>
  );
}

export default Bebidas;
