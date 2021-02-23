import React, { useEffect, useState } from 'react';
import RecipeDetails from '../components/RecipeDetails';

function ComidasDetalhes() {
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
      <RecipeDetails itemId={ itemId } mealType="Meal" />
    </div>
  );
}

export default ComidasDetalhes;
