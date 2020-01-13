import React from 'react';

function AddGuest(props){

    // does this needs states
    // whichever user is logged in, I will need to have their friends
    // already loaded in on the client side. Use this tactic for time being because 
    // it gets much more difficult if I am trying to use the freinds plus also use
    // the all of the users that are using this app

    const { show, onClick} = props
    return (
        <form onSubmit={this.handleSubmit} name="addEater">
            <input type="text"/>
            <input type="submit" value="Add Eater"/>
        </form>
    )
}

export default AddGuest;