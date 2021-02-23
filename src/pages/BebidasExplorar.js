import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExplorarSearchBar from '../components/ExplorarSearchBar';

function BebidasExplorar() {
  return (
    <div>
      <Header title="Explorar Bebidas" hideSearchIcon="true" />
      <ExplorarSearchBar hideAreaButton="true" mealType="bebidas" />
      <Footer />
    </div>
  );
}

export default BebidasExplorar;
