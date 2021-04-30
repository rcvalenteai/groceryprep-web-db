import React from 'react';
import IngredientListDisplay from "./IngredientListDisplay"

function IngredientList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((ingredient) => {
          return <IngredientListDisplay ingredient={ingredient} />;
        })}
      </div>
    )
  }
  return (null);
}

export default IngredientList;
