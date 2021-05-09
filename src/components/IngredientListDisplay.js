
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function IngredientListDisplay({ingredient}) {
    console.log(ingredient);
    const name = ingredient.iname;
    const calories = ingredient.calories;
    const quantity_ing = ingredient.quantity;
    const orderQuantity = ingredient.order_quantity;
    const unit = ingredient.unit;

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const price = formatter.format(ingredient.price);

    let addToOrder = (async (e) => {
        e.preventDefault()
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/ingredients/order";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                groupUrl: sessionStorage.groupUrl,
                ingredientUrl: ingredient.location,
                quantity: parseInt(quantity_ing)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            })
    })

    const [quantity, setQuantity] = useState(1)
    let handleChange = (e) => {
        e.preventDefault()
        setQuantity(e.target.value)
    }


    // render the UI
    if (ingredient) {
        return (
            <div className='listItemDisplay'>
                <h2>{name}</h2>
                <h3>Order Quantity: {orderQuantity}</h3>
                <h3>Calories: {calories}</h3>
                <h3>Price: {price}</h3>
                <h3>Quantity: {quantity} {unit}</h3>

                <form onSubmit={e => addToOrder(e)}>
                    <label>
                        Add To Order:
                        <input type="number" min="1" step="1" value={quantity}
                               onChange={e => handleChange(e)}/>
                    </label>
                    <input type="submit" value="Add to Order"/>
                </form>
                <br></br>
            </div>
        )
    }
    return (null);
}

export default IngredientListDisplay;
