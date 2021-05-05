import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"

function RecipeList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((recipe, index) => {
          return <RecipeListDisplay key={index} recipe={recipe} />;
        })}
      </div>
    )
  }
  return (null);
}

export default RecipeList;
