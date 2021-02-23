import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Bebidas from '../pages/Bebidas';

const testProfile = 'profile-top-btn';
const testTitle = 'page-title';
const testSearch = 'search-top-btn';
const testrecipeTwelve = '11-recipe-card';
const testrecipeOne = '0-recipe-card';
const testNameTwelve = '11-card-name';
const testNameOne = '0-card-name';
const testShearchText = 'search-input';
const testNameSearch = 'name-search-radio';
const testRadioFisrtLetter = 'first-letter-search-radio';
const testExecShearch = 'exec-search-btn';

global.alert = jest.fn();

describe('Testa Bebidas.js', () => {
  it('Verifica se há um header respeitando os atributos descritos no protótipo', () => {
    renderWithRouter(<Bebidas />);
    const header = screen.getByRole('banner');
    const profileIcon = screen.getByTestId(testProfile);
    const pageTitle = screen.getByTestId(testTitle);
    const searchIcon = screen.getByTestId(testSearch);

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon.tagName).toBe('A');
    expect(pageTitle.textContent).toBe('Bebidas');
    expect(searchIcon.tagName).toBe('BUTTON');
  });
  it('Verificar se é renderizada 12 bebidas', async () => {
    renderWithRouter(<Bebidas />);
    const recipeTwelve = await screen.findByTestId(testrecipeTwelve);
    const recipeNameTwelve = await screen.findByTestId(testNameTwelve);
    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('GG');

    expect(recipeTwelve).toBeInTheDocument();
    expect(recipeNameTwelve.textContent).toBe('B-52');
  });
  it(('Pesquisar receitas por ingredite'), async () => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId(testNameSearch);
    const radioFisrtLetter = screen.getByTestId(testRadioFisrtLetter);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'Lemon');
    userEvent.click(radioIngredient);
    fireEvent.click(execShearch);

    const recipeTwelve = await screen.findByTestId(testrecipeTwelve);
    const recipeNameTwelve = await screen.findByTestId(testNameTwelve);
    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('A True Amaretto Sour');

    expect(recipeTwelve).toBeInTheDocument();
    expect(recipeNameTwelve.textContent).toBe('Grape lemon pineapple Smoothie');
  });
  it('Pesquisar bebidas por nome', async () => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioName = screen.getByTestId(testNameSearch);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'Ace');
    userEvent.click(radioName);
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    const recipeThree = await screen.findByTestId('2-recipe-card');
    const recipeNameThree = await screen.findByTestId('2-card-name');

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Ace');

    expect(recipeTwo).toBeInTheDocument();
    expect(recipeNameTwo.textContent).toBe('Angel Face');

    expect(recipeThree).toBeInTheDocument();
    expect(recipeNameThree.textContent).toBe('Space Odyssey');
  });
  it('Pesquisar bebidas pela primeira letra corretamente', async () => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);

    const radioFisrtLetter = screen.getByTestId(testRadioFisrtLetter);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'W');
    userEvent.click(radioFisrtLetter);
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    const recipeEigth = await screen.findByTestId('8-recipe-card');
    const recipeNameEigth = await screen.findByTestId('8-card-name');

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Whisky Mac');

    expect(recipeEigth).toBeInTheDocument();
    expect(recipeNameEigth.textContent).toBe('Waikiki Beachcomber');
  });
  it('Pesquisar de forma incorreta deve aparecer um alerta', async () => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioFisrtLetter = screen.getByTestId(testRadioFisrtLetter);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'AB');
    userEvent.click(radioFisrtLetter);
    fireEvent.click(execShearch);

    expect(alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });

  it('Caso uma bebida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioName = screen.getByTestId(testNameSearch);
    const execShearch = screen.getByTestId(testExecShearch);

    userEvent.type(inputTextSearch, 'A1');
    userEvent.click(radioName);
    fireEvent.click(execShearch);

    await screen.findByText('A1');

    expect(history.location.pathname).toBe('/bebidas/17222');
  });
});
