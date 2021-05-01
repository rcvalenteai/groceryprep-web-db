import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"
import OrderRecipeDetailDisplay from "./OrderRecipeDetailDisplay";

function OrderRecipeList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((recipe, index) => {
          return <OrderRecipeDetailDisplay key={index} recipe={recipe} />;
        })}
      </div>
    )
  }
  return (null);
}

export default OrderRecipeList;
