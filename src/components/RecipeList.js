import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"

function RecipeList({data})
{
  console.log("Recipe List")
  console.log(data);
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
