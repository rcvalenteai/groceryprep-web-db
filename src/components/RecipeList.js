import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"

function RecipeTable({data}) 
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

export default RecipeTable;
