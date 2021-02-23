import React from 'react';
import PropTypes from 'prop-types';

function CardList({ arrayOfCard, typeOfCard, sideScroll, recommendation }) {
  arrayOfCard.length = 12;
  const magicNumberZero = 0;

  const id = `id${typeOfCard}`;
  const name = `str${typeOfCard}`;
  const src = `str${typeOfCard}Thumb`;
  const pathType = typeOfCard === 'Meal' ? 'comidas' : 'bebidas';

  return (
    <div
      className={ `card-list${sideScroll}` }
    >
      { arrayOfCard.length === magicNumberZero
        ? (<h3>Carregando...</h3>)
        : arrayOfCard.map((item, index) => (
          <div
            data-testid={
              recommendation === 'true'
                ? `${index}-recomendation-card`
                : `${index}-recipe-card`
            }
            className="item-card"
            key={ item[id] }
          >
            <a href={ `/${pathType}/${item[id]}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ item[src] }
                alt="item"
              />
              <h3
                data-testid={
                  recommendation === 'true'
                    ? `${index}-recomendation-title`
                    : `${index}-card-name`
                }
              >
                {item[name]}
              </h3>
            </a>
          </div>
        ))}
    </div>
  );
}

CardList.propTypes = {
  arrayOfCard: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  typeOfCard: PropTypes.string.isRequired,
  sideScroll: PropTypes.string.isRequired,
  recommendation: PropTypes.string.isRequired,
};

export default CardList;
