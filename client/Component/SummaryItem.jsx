import React from 'react';

function Summary(props){
    const {friend} = props
    return(
        <div>
            <h3>{friend}</h3>
        </div>
    )
}

export default Summary;