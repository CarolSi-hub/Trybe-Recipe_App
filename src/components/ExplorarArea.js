import React, { useEffect, useState } from 'react';
import { fetchAllAreaOptions, fetchFoodByArea, fetchGlobalMeal } from '../services/API';
import CardList from './CardList';

function ExplorarArea() {
  const [areaList, setAreaList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const renderOptions = async () => {
      const list = await fetchAllAreaOptions();
      if (list) setAreaList(list);
    };

    const renderList = async () => {
      const list = await fetchGlobalMeal();
      list.length = 12;
      if (list) setCardList(list);
    };
    renderOptions();
    renderList();
  }, []);

  const filterByArea = async (area) => {
    let list = [];
    if (area === 'All') {
      list = await fetchGlobalMeal();
    } else {
      list = await fetchFoodByArea(area);
    }
    console.log(list);
    if (list) setCardList(list);
  };

  return (
    <div>
      <select
        onChange={ ({ target }) => filterByArea(target.value) }
        data-testid="explore-by-area-dropdown"
      >
        {' '}
        Selecione a Área:
        <option key="All" value="All" data-testid="All-option">All</option>
        {areaList.map((item) => (
          <option
            key={ item.strArea }
            value={ item.strArea }
            data-testid={ `${item.strArea}-option` }
          >
            {item.strArea}
          </option>
        ))}
      </select>
      <CardList
        arrayOfCard={ cardList }
        typeOfCard="Meal"
        sideScroll=""
        recommendation="false"
      />

    </div>
  );
}

export default ExplorarArea;
