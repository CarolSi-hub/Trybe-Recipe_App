import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Comidas from '../pages/Comidas';

global.alert = jest.fn();

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

describe('Testa Comidas.js', () => {
  it('Verifica se há um header respeitando os atributos descritos no protótipo', () => {
    renderWithRouter(<Comidas />);
    const header = screen.getByRole('banner');
    const profileIcon = screen.getByTestId(testProfile);
    const pageTitle = screen.getByTestId(testTitle);
    const searchIcon = screen.getByTestId(testSearch);

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon.tagName).toBe('A');
    expect(pageTitle.textContent).toBe('Comidas');
    expect(searchIcon.tagName).toBe('BUTTON');
  });
  it('Verificar se é renderizada 12 receitas', async () => {
    renderWithRouter(<Comidas />);
    const recipeTwelve = await screen.findByTestId(testrecipeTwelve);
    const recipeNameTwelve = await screen.findByTestId(testNameTwelve);
    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Corba');

    expect(recipeTwelve).toBeInTheDocument();
    expect(recipeNameTwelve.textContent).toBe('Kapsalon');
  });
  it(('Pesquisar receitas por ingredite'), async () => {
    renderWithRouter(<Comidas />);
    const searchIconBtn = screen.getByTestId(testSearch);

    fireEvent.click(searchIconBtn);

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

    userEvent.type(inputTextSearch, 'Carrots');
    userEvent.click(radioIngredient);
    fireEvent.click(execShearch);

    await screen.findByText('Beef and Mustard Pie');

    const recipeTwelve = await screen.findByTestId(testrecipeTwelve);
    const recipeNameTwelve = await screen.findByTestId(testNameTwelve);
    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Beef and Mustard Pie');

    expect(recipeTwelve).toBeInTheDocument();
    expect(recipeNameTwelve.textContent).toBe('Creamy Tomato Soup');
  });
  it('Pesquisar receitas por nome', async () => {
    renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioName = screen.getByTestId(testNameSearch);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'Mac');
    userEvent.click(radioName);
    fireEvent.click(execShearch);

    await screen.findByText('Big Mac');

    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    const recipeThree = await screen.findByTestId('2-recipe-card');
    const recipeNameThree = await screen.findByTestId('2-card-name');

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Big Mac');

    expect(recipeTwo).toBeInTheDocument();
    expect(recipeNameTwo.textContent).toBe('Chicken Fajita Mac and Cheese');

    expect(recipeThree).toBeInTheDocument();
    expect(recipeNameThree.textContent).toBe('Grilled Mac and Cheese Sandwich');
  });
  it('Pesquisar receitas pela primeira letra corretamente', async () => {
    renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);

    const radioFisrtLetter = screen.getByTestId(testRadioFisrtLetter);
    const execShearch = screen.getByTestId(testExecShearch);

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'A');
    userEvent.click(radioFisrtLetter);
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId(testrecipeOne);
    const recipeNameOne = await screen.findByTestId(testNameOne);

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    expect(recipeOne).toBeInTheDocument();
    expect(recipeNameOne.textContent).toBe('Apple Frangipan Tart');

    expect(recipeTwo).toBeInTheDocument();
    expect(recipeNameTwo.textContent).toBe('Apple & Blackberry Crumble');
  });
  it('Pesquisar de forma incorreta deve aparecer um alerta', async () => {
    renderWithRouter(<Comidas />);
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
  it('Caso uma comida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId(testSearch);

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId(testShearchText);
    const radioName = screen.getByTestId(testNameSearch);
    const execShearch = screen.getByTestId(testExecShearch);

    userEvent.type(inputTextSearch, 'Corba');
    userEvent.click(radioName);
    fireEvent.click(execShearch);

    await screen.findByText('Corba');

    expect(history.location.pathname).toBe('/comidas/52977');
  });
});
