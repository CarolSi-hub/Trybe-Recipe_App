import React from 'react';
import PropTypes from 'prop-types';
import heartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class RecipesLiked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: 'hidden',
      favoriteList: [],
    };
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  componentDidMount() {
    this.setFavoriteRecipes();
  }

  setFavoriteRecipes() {
    const { favoriteRecipes } = this.props;
    this.setState({
      favoriteList: favoriteRecipes,
    });
  }

  filterByType(type) {
    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'all') { this.setState({ favoriteList: favList }); } else {
      favList = favList.filter((item) => item.type === type);
      this.setState({ favoriteList: favList });
    }
  }

  deleteFavorites(itemId) {
    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favList = favList.filter((item) => itemId !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
    this.setState({ favoriteList: favList });
  }

  copyLink(id, type) {
    const url = `http://localhost:3000/${type === 'comida' ? 'comidas' : 'bebidas'}/${id}`;
    copy(url);
    this.setState({ showMessage: '' });
  }

  render() {
    const { favoriteList } = this.state;
    const { showMessage } = this.state;

    return (
      <div>
        <div className="navbar">
          <button
            className="navbar-button"
            onClick={ () => this.filterByType('comida') }
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            className="navbar-button"
            onClick={ () => this.filterByType('bebida') }
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
          <button
            className="navbar-button"
            onClick={ () => this.filterByType('all') }
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
        </div>
        <div
          className="card-list"
        >
          {favoriteList.map((receita, index) => (
            <div key={ `receita-${index}` } className="item-card">
              <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                <img
                  src={ receita.image }
                  width="100%"
                  alt="foto de uma comida"
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {receita.name}
                </p>
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
              <div className="detalhes-top">
                <button
                  className="icon-button"
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => this.copyLink(receita.id, receita.type) }
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
                  onClick={ () => this.deleteFavorites(receita.id) }
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
            </div>))}
        </div>
      </div>
    );
  }
}

RecipesLiked.propTypes = {
  favoriteRecipes: PropTypes.objectOf.isRequired,
};

export default RecipesLiked;
