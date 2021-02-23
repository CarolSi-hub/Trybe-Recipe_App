import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientList from '../components/IngredientList';
import { fetchDrinkIngredients } from '../services/API';

function BebidasIngredientes() {
  const [requiredIngredients, setRequiredIngredients] = useState([]);
  useEffect(() => {
    const requireIngredients = async () => {
      setRequiredIngredients(await fetchDrinkIngredients());
    };
    requireIngredients();
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" hideSearchIcon="true" />
      <IngredientList mealType="Drink" requiredIngredients={ requiredIngredients } />
      <Footer />
    </div>
  );
}

export default BebidasIngredientes;
