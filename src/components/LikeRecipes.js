import React from 'react';
import RecipesLiked from './RecipesLiked';

class LikeRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
    };
    this.recipesFavorited = this.recipesFavorited.bind(this);
  }

  componentDidMount() {
    this.recipesFavorited();
  }

  recipesFavorited() {
    const favoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    this.setState({ favoriteRecipes });
  }

  render() {
    const { favoriteRecipes } = this.state;
    const magicNumber = 0;
    if (!favoriteRecipes || favoriteRecipes.length === magicNumber) {
      return <h1> Você ainda não tem uma receita favorita </h1>;
    }

    return (
      <div>
        <RecipesLiked
          favoriteRecipes={ favoriteRecipes }
        />
      </div>
    );
  }
}

export default LikeRecipes;
