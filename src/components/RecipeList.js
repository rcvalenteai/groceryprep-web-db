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
        {data.map((recipe) => {
          return <RecipeListDisplay recipe={recipe} />;
        })}
      </div>
    )
  }
  return (null);
}

export default RecipeList;
