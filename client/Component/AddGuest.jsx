import React from 'react';

function AddGuest(props){
    // check props to see if there was a failed attempt
    // if there was then pass back a message with the guess button
    // otherwise just send add guest button
    const { show, addGuest} = props
    if (show.guestStatement) {
        return (
            <div>
                <span>Looks like you tried adding a user that does not exist. You can create a </span>
                <u onClick={addGuest}>Guest</u>
                <span> user instead!</span>
            </div>
        )
    } else {
        return (
            <u onClick={addGuest}>Add Guest</u>
        )
    }
}

export default AddGuest;