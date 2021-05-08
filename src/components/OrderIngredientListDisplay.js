import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import RecipeIngredientDisplay from "./RecipeIngredientDisplay";

function IngredientListDisplay({ingredient}) {
    const name = ingredient.iname;
    const quantity = ingredient.quantity;
    const unit = ingredient.unit;

    // render the UI
    if (ingredient) return (
        <div>
            <h2>{name}</h2>
            <h3>Quantity: {quantity} {unit}</h3>
            <br />
        </div>
    )
    return (null);
    }

export default IngredientListDisplay;
