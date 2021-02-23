import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExplorarArea from '../components/ExplorarArea';

function ComidasArea() {
  return (
    <div>
      <Header title="Explorar Origem" hideSearchIcon="false" />
      <ExplorarArea />
      <Footer />
    </div>
  );
}

export default ComidasArea;
