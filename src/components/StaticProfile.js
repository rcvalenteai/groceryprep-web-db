import React from 'react';
import profilePicture from '../components/genericProfile.png'

function StaticProfile({ user }) {
    return (
        <div className='profile'>
            <h1>User Profile</h1>
            <div>
                <table className='profileSection'>
                    <tbody>
                        <tr>
                            <td>
                                <h2>{user.fname} {user.lname}</h2>
                                <p>Joined GroceryPrepper on: {user.creation_date}</p>
                            </td>
                            <td>
                                <img src={profilePicture} alt={"Profile Photo"} style={{ width: "80%" }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Details</h3>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
        </div>
    )
}

export default StaticProfile;
