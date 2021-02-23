import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa App.js', () => {
  it('A pagina de login é renderizada ao carregar a aplicação no path de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Crie um local para que o usuário insira seu email e senha', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
});
