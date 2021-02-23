import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TelaExplorar from '../components/TelaExplorar';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" hideSearchIcon="true" />
      <TelaExplorar />
      <Footer />
    </div>
  );
}

export default Explorar;
