import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function RecipeListDisplay({recipe}) {
    const name = recipe.name;
    const calories = recipe.calories;
    const description = recipe.description;
    const location = recipe.location;
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }

    let addToOrder = (async (e) => {
        e.preventDefault()
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/recipes/order";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                groupUrl: sessionStorage.groupUrl,
                recipeUrl: recipe.location,
                quantity: parseInt(quantity)
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
    if (recipe) {
        return (
            <div className='listItemDisplay'>
                <h2>{name}</h2>
                <p>Calories: {calories}</p>
                <p>{descriptionTag}</p>
                <p><Link to={location}>Details</Link></p>

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

export default RecipeListDisplay;
