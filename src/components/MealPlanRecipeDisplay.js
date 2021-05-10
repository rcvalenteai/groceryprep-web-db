import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function MealPlanListDisplay({mealplan}) {
    const name = mealplan.name;
    const description = mealplan.description;
    const location = mealplan.location;
    console.log(location)
    let descriptionTag;
    if (description) {
        descriptionTag = <p>Description: { description }</p>
    }

    let subscribe = (async (e) => {
        e.preventDefault()
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        const userIdRegex = /\d+/g
        const userUrl = sessionStorage.userUrl.match(userIdRegex)
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/mealplan/subscribe";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                mealPlanUrl: mealplan.location,
                userUrl: userUrl[0]
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
    if (mealplan) {
        return (
            <div className='listItemDisplay'>
                <h2>{name}</h2>
                <p>{descriptionTag}</p>
                <p><Link to={location}>Details</Link></p>

                <button onClick={e => subscribe(e)}>Subscribe</button>
                <br></br>
            </div>
        )
    }
    return (null);
}

export default MealPlanListDisplay;

