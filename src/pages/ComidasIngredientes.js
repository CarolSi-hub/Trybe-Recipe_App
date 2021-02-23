import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientList from '../components/IngredientList';
import { fetchMealIngredients } from '../services/API';

function ComidasIngredientes() {
  const [requiredIngredients, setRequiredIngredients] = useState([]);
  useEffect(() => {
    const requireIngredients = async () => {
      setRequiredIngredients(await fetchMealIngredients());
    };
    requireIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" hideSearchIcon="true" />
      <IngredientList mealType="Meal" requiredIngredients={ requiredIngredients } />
      <Footer />
    </div>
  );
}

export default ComidasIngredientes;
