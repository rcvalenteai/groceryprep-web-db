import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"
import MealPlanRecipeDisplay from "./MealPlanRecipeDisplay";

function MealPlanRecipeList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((recipe, index) => {
          return <MealPlanRecipeDisplay key={index} recipe={recipe} />;
        })}
      </div>
    )
  }
  return (null);
}

export default MealPlanRecipeList;
