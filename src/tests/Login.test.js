import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

const emailDataTestId = 'email-input';
const passwordDataTestId = 'password-input';
const buttonDataTestId = 'login-submit-btn';
const emailInputText = 'name@email.com';
describe('Testa Login.js', () => {
  it('A pagina de login é renderizada ao carregar a aplicação no path de URL /', () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />, '/');
    const email = getByTestId(emailDataTestId);
    const senha = getByTestId(passwordDataTestId);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  it('Crie um botão com o texto \'Entrar\'', () => {
    const { getByTestId } = renderWithRouter(<Login />, '/');

    const button = getByTestId(buttonDataTestId);
    expect(button).toBeInTheDocument();
  });

  it('O botao deve estar desabilitado antes das verificacoes de email e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const button = getByTestId(buttonDataTestId);
    expect(button).toBeDisabled();

    const emailInput = getByTestId(emailDataTestId);
    const passwordInput = getByTestId(passwordDataTestId);

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email@com@');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'emailcom@');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, emailInputText);
    userEvent.type(passwordInput, '23456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'alguem@email.');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, emailInputText);
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });

  it('Salve o email no localStorage, com a chave email, quando o usuário logar', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId(emailDataTestId);
    const senha = getByTestId(passwordDataTestId);
    const button = getByTestId(buttonDataTestId);

    userEvent.type(email, emailInputText);
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    expect(localStorage.getItem('user')).toBe(`{"email":"${emailInputText}"}`);
  });

  it('Salve os tokens no localStorage, chaves mealsToken/cocktailsToken,se logar', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId(emailDataTestId);
    const senha = getByTestId(passwordDataTestId);
    const button = getByTestId(buttonDataTestId);

    userEvent.type(email, emailInputText);
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });

  it('A rota deve ser mudada para \'/comidas\' após o clique no botão.', () => {
    const { history, getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId(emailDataTestId);
    const senha = getByTestId(passwordDataTestId);
    const button = getByTestId(buttonDataTestId);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });
});
