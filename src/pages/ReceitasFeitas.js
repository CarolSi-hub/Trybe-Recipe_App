import React from 'react';
import Header from '../components/Header';
import CompletedRecipe from '../components/CompletedRecipe';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" hideSearchIcon="true" />
      <div>
        <CompletedRecipe />
      </div>
    </div>
  );
}

export default ReceitasFeitas;
