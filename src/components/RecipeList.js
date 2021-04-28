import React from 'react';

function RecipeTable({data}) 
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((recipe) => {
          const name = recipe.name;
          //return <Recipe />;
          return <h2>{name}</h2>;
        })}
      </div>
    )
  }
  return (null);
}

export default RecipeTable;
