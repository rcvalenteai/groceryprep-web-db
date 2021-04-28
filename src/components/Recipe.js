import React from 'react';

function Recipe({recipe}) 
{
  const name = recipe.name;
  const calories = recipe.calories;
  const description = recipe.description;
  // render the UI
  if (recipe) {
    return (
      <div>
        <h2>{name}</h2>
        <h3>{calories}</h3>
        <p>{description}</p>
      </div>
    )
  }
  return (null);
}

export default Recipe;
