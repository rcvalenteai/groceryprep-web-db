import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"

function RecipeList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((recipe) => {
          return <RecipeListDisplay recipe={recipe} />;
        })}
      </div>
    )
  }
  return (null);
}

export default RecipeList;
