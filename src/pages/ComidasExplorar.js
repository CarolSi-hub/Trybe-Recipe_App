import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExplorarSearchBar from '../components/ExplorarSearchBar';

function ComidasExplorar() {
  return (
    <div>
      <Header title="Explorar Comidas" hideSearchIcon="true" />
      <ExplorarSearchBar hideAreaButton="false" mealType="comidas" />
      <Footer />
    </div>
  );
}

export default ComidasExplorar;
