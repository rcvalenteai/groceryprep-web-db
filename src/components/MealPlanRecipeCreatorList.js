import React from 'react';
import RecipeListDisplay from "./RecipeListDisplay"
import MealPlanRecipeCreatorDisplay from "./MealPlanRecipeCreatorDisplay";

function MealPlanRecipeCreatorList({data})
{
    // render the UI
    if (data) {
        return (
            <div>
                {data.map((recipe, index) => {
                    return <MealPlanRecipeCreatorDisplay key={index} recipe={recipe} />;
                })}
            </div>
        )
    }
    return (null);
}

export default MealPlanRecipeCreatorList;
