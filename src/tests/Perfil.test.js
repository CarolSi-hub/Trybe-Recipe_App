import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Perfil from '../pages/Perfil';

describe('Testa a tela de perfil do usuario', () => {
  it('Testa se a tela possui o header', () => {
    const { getByText } = renderWithRouter(<Perfil />, '/');

    const titulo = getByText('Perfil');
    expect(titulo).toBeInTheDocument();
  });

  it('Testa se a tela possui o footer', () => {
    const { getByTestId } = renderWithRouter(<Perfil />, '/');

    const drinkButton = getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });

  it('Testa se o email do usuario estao na tela', () => {
    const { getByTestId } = renderWithRouter(<Perfil />, '/');

    const emailField = getByTestId('profile-email');
    expect(emailField).toBeInTheDocument();
  });

  it('Testa se o botao de receitas feitas esta na tela', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />, '/');

    const doneRecipeButton = getByTestId('profile-done-btn');
    expect(doneRecipeButton).toBeInTheDocument();

    fireEvent.click(doneRecipeButton);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Testa se o botao de receitas favoritas esta na tela', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />, '/');

    const favoriteRecipeButton = getByTestId('profile-favorite-btn');
    expect(favoriteRecipeButton).toBeInTheDocument();

    fireEvent.click(favoriteRecipeButton);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Testa se o botao de logout esta na tela', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />, '/');

    const logoutButton = getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
