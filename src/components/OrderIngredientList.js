import React from 'react';
import IngredientListDisplay from "./IngredientListDisplay"
import OrderIngredientListDisplay from "./OrderIngredientListDisplay";

function IngredientList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((ingredient, index) => {
          return <OrderIngredientListDisplay ingredient={ingredient} key={index}/>;
        })}
      </div>
    )
  }
  return (null);
}

export default IngredientList;
