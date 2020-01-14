import React from 'react';
import {RangeInput} from 'grommet'

function Summary(props){
    const {friend} = props
    return(
        <div>
            <h3>{friend}</h3>
            <RangeInput></RangeInput>
        </div>
    )
}

export default Summary;