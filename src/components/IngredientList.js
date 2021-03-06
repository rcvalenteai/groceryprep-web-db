import React from 'react';
import IngredientListDisplay from "./IngredientListDisplay"

function IngredientList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((ingredient, index) => {
          return <IngredientListDisplay ingredient={ingredient} key={index} />;
        })}
      </div>
    )
  }
  return (null);
}

export default IngredientList;
