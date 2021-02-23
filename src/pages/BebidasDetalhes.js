import React, { useEffect, useState } from 'react';
import RecipeDetails from '../components/RecipeDetails';

function BebidasDetalhes() {
  const zero = 0;
  const [itemId, setItemId] = useState(zero);

  const getIdFromUrl = () => {
    let id = window.location.href;
    id = id.split('/').pop();
    setItemId(id);
  };

  useEffect(() => {
    getIdFromUrl();
  });
  return (
    <div className="detalhes-main">
      <RecipeDetails itemId={ itemId } mealType="Drink" />
    </div>
  );
}

export default BebidasDetalhes;
