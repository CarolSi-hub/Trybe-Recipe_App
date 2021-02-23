import React from 'react';
import renderWithRouter from '../renderWithRouter';
import ComidasProcesso from '../pages/ComidasProcesso';
import BebidasProcesso from '../pages/BebidasProcesso';

describe('Testa Receitas inProgress.js', () => {
  it('A pagina renderizada possui a foto da receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const recipeThumb = getByTestId('recipe-photo');
    expect(recipeThumb).toBeInTheDocument();
  });

  it('A pagina renderizada possui a foto da receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const recipeThumb = getByTestId('recipe-photo');
    expect(recipeThumb).toBeInTheDocument();
  });

  it('A pagina renderizada possui o titulo da receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  it('A pagina renderizada possui o titulo da receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  it('A pagina renderizada possui o botao compartilhar da receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const shareButton = getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });

  it('A pagina renderizada possui o botao compartilhar da receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const shareButton = getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });

  it('A pagina renderizada possui o botao favoritar da receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const favButton = getByTestId('favorite-btn');
    expect(favButton).toBeInTheDocument();
  });

  it('A pagina renderizada possui o botao favoritar da receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const favButton = getByTestId('favorite-btn');
    expect(favButton).toBeInTheDocument();
  });

  it('A pagina renderizada possui a categoria da receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const category = getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });

  it('A pagina renderizada possui a categoria da receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const category = getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });

  it('A pagina renderizada possui botao finish desabilitado receita de comida', () => {
    const id = 52977;
    const { getByTestId } = renderWithRouter(<ComidasProcesso
      match={ { params: { id } } }
    />);

    const finishButton = getByTestId('finish-recipe-btn');
    expect(finishButton).toHaveAttribute('disabled');
  });

  it('A pagina renderizada possui botao finish desabilitado receita de bebida', () => {
    const id = 17222;
    const { getByTestId } = renderWithRouter(<BebidasProcesso
      match={ { params: { id } } }
    />);

    const finishButton = getByTestId('finish-recipe-btn');
    expect(finishButton).toHaveAttribute('disabled');
  });
});
