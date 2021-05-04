import React from 'react';

function StaticProfile({user}) {
    return (
        <div>

            <h2>Name: {user.fname} {user.lname}</h2>
            <p>Joined GroceryPrepper on: {user.creation_date}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
        </div>
    )
}


export default StaticProfile;
