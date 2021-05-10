import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"
import MealPlanRecipeDisplay from "./MealPlanRecipeDisplay";

function MealPlanRecipeList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((mealplan, index) => {
          return <MealPlanRecipeDisplay key={index} mealplan={mealplan} />;
        })}
      </div>
    )
  }
  return (null);
}

export default MealPlanRecipeList;
