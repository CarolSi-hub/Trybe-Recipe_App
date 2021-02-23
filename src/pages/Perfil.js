import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" hideSearchIcon="true" />
      <Profile />
      <Footer />
    </div>
  );
}

export default Perfil;
