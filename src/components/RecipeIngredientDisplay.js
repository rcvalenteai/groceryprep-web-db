import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import stylesheet from '../css/ListItemDisplay.css'

function RecipeIngredientDisplay({ingredient}) {
    const name = ingredient.iname;
    const calories = ingredient.calories;
    const quantity = ingredient.quantity;
    const unit = ingredient.unit;
    // render the UI
    if (ingredient) {
        return (
            <div className='innerListItemDisplay'>
                <h5>{name}</h5>
                <p><t></t>Calories: {calories}</p>
                <p>Quantity: {quantity} {unit}</p>
                {/* <br></br> */}
            </div>
        )
    }
        return (null);
    }

export default RecipeIngredientDisplay;
