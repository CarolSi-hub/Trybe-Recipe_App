import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Details from '../components/Details';

const recipeTitle = 'recipe-title';
const itemIdMeal = 52977;
const itemIdDrink = 15997;
const photo = 'recipe-photo';
const share = 'share-btn';
const favorite = 'favorite-btn';
const instructionsData = 'instructions';
const category = 'recipe-category';

describe('Testa o comportamente do componente Detaiis.js', () => {
  it('Testa que os elementos são referentes a página e a receita.', async () => {
    renderWithRouter(<Details itemId={ itemIdMeal } mealType="Meal" />);
    const imgMeal = await screen.findByTestId(photo);
    const title = await screen.findByTestId(recipeTitle);
    const shareBtn = await screen.findByTestId(share);
    const favoriteBtn = await screen.findByTestId(favorite);
    const instructions = await screen.findByTestId(instructionsData);

    await screen.findByText('Corba');

    expect(imgMeal).toBeInTheDocument();
    expect(imgMeal.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Corba');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn.textContent).toBe('Compartilhar');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.textContent).toBe('Favoritar');
    expect(instructions).toBeInTheDocument();
  });
  it('Verifica a categoria e os ingredientes corespondentes a receita', async () => {
    renderWithRouter(<Details itemId={ itemIdMeal } mealType="Meal" />);
    const title = await screen.findByTestId(recipeTitle);
    const typeRecipe = await screen.findByTestId(category);

    await screen.findByText('Corba');

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Corba');
    expect(typeRecipe).toBeInTheDocument();
    expect(typeRecipe.textContent).toBe('Side');

    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient4 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('7-ingredient-name-and-measure');
    const ingredient8 = await screen.findByTestId('8-ingredient-name-and-measure');
    const ingredient9 = await screen.findByTestId('9-ingredient-name-and-measure');
    const ingredient10 = await screen.findByTestId('10-ingredient-name-and-measure');
    const ingredient11 = await screen.findByTestId('11-ingredient-name-and-measure');
    const ingredient12 = await screen.findByTestId('12-ingredient-name-and-measure');

    expect(ingredient0.textContent).toContain('Lentils');
    expect(ingredient0.textContent).toContain('1 cup');
    expect(ingredient1.textContent).toContain('Onion');
    expect(ingredient1.textContent).toContain('1 large');
    expect(ingredient2.textContent).toContain('Carrots');
    expect(ingredient2.textContent).toContain('1 large');
    expect(ingredient3.textContent).toContain('Tomato Puree');
    expect(ingredient3.textContent).toContain('1 tbs');
    expect(ingredient4.textContent).toContain('Cumin');
    expect(ingredient4.textContent).toContain('2 tsp');
    expect(ingredient5.textContent).toContain('Paprika');
    expect(ingredient5.textContent).toContain('1 tsp');
    expect(ingredient6.textContent).toContain('Mint');
    expect(ingredient6.textContent).toContain('1/2 tsp');
    expect(ingredient7.textContent).toContain('Thyme');
    expect(ingredient7.textContent).toContain('1/2 tsp');
    expect(ingredient8.textContent).toContain('Black Pepper');
    expect(ingredient8.textContent).toContain('1/4 tsp');
    expect(ingredient9.textContent).toContain('Red Pepper Flakes');
    expect(ingredient9.textContent).toContain('1/4 tsp');
    expect(ingredient10.textContent).toContain('Vegetable Stock');
    expect(ingredient10.textContent).toContain('4 cups');
    expect(ingredient11.textContent).toContain('Water');
    expect(ingredient11.textContent).toContain('1 cup');
    expect(ingredient12.textContent).toContain('Sea Salt');
    expect(ingredient12.textContent).toContain('Pinch');
  });
  it('Testa que os elementos são referentes a página e ao drink.', async () => {
    renderWithRouter(<Details itemId={ itemIdDrink } mealType="Drink" />);
    const imgDrink = await screen.findByTestId(photo);
    const title = await screen.findByTestId(recipeTitle);
    const shareBtn = await screen.findByTestId(share);
    const favoriteBtn = await screen.findByTestId(favorite);
    const instructions = await screen.findByTestId(instructionsData);

    await screen.findByText('GG');

    expect(imgDrink).toBeInTheDocument();
    expect(imgDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('GG');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn.textContent).toBe('Compartilhar');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.textContent).toBe('Favoritar');
    expect(instructions).toBeInTheDocument();
  });
  it('Verifica a categoria e os ingredientes corespondentes ao drink', async () => {
    renderWithRouter(<Details itemId={ itemIdDrink } mealType="Drink" />);
    const title = await screen.findByTestId(recipeTitle);
    const typeRecipe = await screen.findByTestId(category);

    await screen.findByText('GG');

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('GG');
    expect(typeRecipe).toBeInTheDocument();
    expect(typeRecipe.textContent).toBe('Optional alcohol');

    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');

    expect(ingredient0.textContent).toContain('Galliano');
    expect(ingredient0.textContent).toContain('2 1/2 shots');
    expect(ingredient1.textContent).toContain('Ginger ale');
    expect(ingredient2.textContent).toContain('Ice');
  });
  it('Verifica a mudança de rota para \'/in-progress\'', async () => {
    const { history } = renderWithRouter(
      <Details
        itemId={ itemIdMeal }
        mealType="Meal"
      />,
    );
    const startBtn = await screen.findByTestId('start-recipe-btn');

    await screen.findByText('Corba');

    expect(startBtn).toBeInTheDocument();
    expect(startBtn.textContent).toBe('Iniciar');

    fireEvent.click(startBtn);

    expect(history.location.pathname).toBe('/comidas/52977/in-progress');
  });
});
