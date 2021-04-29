import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function RecipeIngredientDisplay({ingredient}) {
    const name = ingredient.iname;
    const calories = ingredient.calories;
    const quantity = ingredient.quantity;
    const unit = ingredient.unit;
    // render the UI
    if (ingredient) {
        return (
            <div>
                <h4>{name}</h4>
                <h5>Calories: {calories}</h5>
                <h5>Quantity: {quantity} {unit}</h5>
                <br></br>
            </div>
        )
    }
        return (null);
    }

export default RecipeIngredientDisplay;
