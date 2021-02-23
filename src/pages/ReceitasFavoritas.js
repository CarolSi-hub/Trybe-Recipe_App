import React from 'react';
import Header from '../components/Header';
import LikeRecipes from '../components/LikeRecipes';

function ReceitasFavoritas() {
  return (
    <div>
      <Header title="Receitas Favoritas" hideSearchIcon="true" />
      <LikeRecipes />
    </div>
  );
}

export default ReceitasFavoritas;
