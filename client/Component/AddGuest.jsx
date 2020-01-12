import React from 'react';

function AddGuest(props){
    // check props to see if there was a failed attempt
    // if there was then pass back a message with the guess button
    // otherwise just send add guest button
    const { show, onClick} = props
    if (show.guestStatement) {
        return (
            <div>
                <span>Looks like you tried adding a user that does not exist. You can create a </span>
                <u onClick={onClick}>Guest</u>
                <span> user instead!</span>
            </div>
        )
    } else {
        return (
            <u onClick={onClick}>Add Guest</u>
        )
    }
}

export default AddGuest;