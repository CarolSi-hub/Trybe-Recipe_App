import React from 'react';
import PropTypes from 'prop-types';

function CategoryBar({ arrayOfCategories, setCategory, category }) {
  const magicNumberZero = 0;
  arrayOfCategories.length = 5;

  const setCategoryOnClick = async ({ target }) => {
    if (target.value === category) {
      setCategory('');
    } else {
      setCategory(target.value);
    }
  };

  return (
    <div className="navbar">
      <button
        className="navbar-button"
        type="button"
        value=""
        data-testid="All-category-filter"
        onClick={ (event) => setCategory(event.target.value) }
      >
        All
      </button>
      { arrayOfCategories.length > magicNumberZero
        && arrayOfCategories.map((item) => (
          <button
            className="navbar-button"
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            key={ item.strCategory }
            value={ item.strCategory }
            onClick={ (event) => setCategoryOnClick(event) }
          >
            {item.strCategory}
          </button>
        ))}
    </div>
  );
}

CategoryBar.propTypes = {
  arrayOfCategories: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryBar;
