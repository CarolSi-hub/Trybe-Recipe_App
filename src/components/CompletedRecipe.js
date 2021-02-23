import React, { useEffect, useState } from 'react';
import filterByType from './FilterByType';
import getListFromLocal from './GetListFromLocal';
import heartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CompletedRecipe() {
  const zero = 0;
  const [finishedList, setFinishedList] = useState([]);
  const [showMessage, setShowMessage] = useState('hidden');
  const tresMil = 3000;

  const copyLink = (id, type) => {
    const url = `http://localhost:3000/${type === 'comida' ? 'comidas' : 'bebidas'}/${id}`;
    copy(url);
    setShowMessage('');
    setTimeout(() => { setShowMessage('hidden'); }, tresMil);
  };

  useEffect(() => {
    getListFromLocal(setFinishedList);
  }, []);

  return (
    <div>

      <div className="navbar">
        <button
          className="navbar-button"
          onClick={ () => filterByType('comida', setFinishedList) }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          className="navbar-button"
          onClick={ () => filterByType('bebida', setFinishedList) }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        <button
          className="navbar-button"
          onClick={ () => filterByType('all', setFinishedList) }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
      </div>
      <div
        className="card-list"
      >
        {
          finishedList.length === zero
            ? <h3 className="alert">Nenhuma Receita Finalizada =]</h3>
            : finishedList.map((receita, index) => (
              <div key={ `receita-${index}` } className="done-item-card">
                <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                  <img
                    className="details-img-main"
                    src={ receita.image }
                    width="100%"
                    alt="foto de uma comida"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </a>
                <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                  <h3
                    // className="horizontal-name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {receita.name}
                  </h3>
                </a>

                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {receita.type === 'Drink' ? null
                    : `${receita.area} - ${receita.category}`}
                </p>

                { receita.type === 'Meal'
                  ? null
                  : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {receita.alcoholicOrNot}
                    </p>)}
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {receita.doneDate}
                </p>

                {receita.tags.map((item) => (
                  <p
                    key={ item }
                    data-testid={ `${index}-${item}-horizontal-tag` }
                  >
                    {item}
                  </p>
                ))}
                <div className="makeFlex">

                  <button
                    className="icon-button"
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => copyLink(receita.id, receita.type) }
                  >
                    <img
                      className="button-img"
                      src={ shareIcon }
                      alt="share-icon"
                      width="10px"
                    />
                  </button>

                  <button
                    className="icon-button"
                    type="button"
                    tabIndex="0"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    // onClick={ () => deleteFavorites(receita.id) }
                  >
                    <img
                      className="button-img"
                      src={ heartIcon }
                      alt="heartIcon"
                      width="50px"
                    />
                  </button>
                </div>
                <h4 hidden={ showMessage }>Link copiado!</h4>
              </div>))
        }
      </div>
    </div>
  );
}

export default CompletedRecipe;
