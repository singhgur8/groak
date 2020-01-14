import React from 'react';

function Results(props){
    const { restaurant } = props
    const { name, image_url, rating, location} = restaurant
    return(
        <div>
            <div>Name: {name}</div>
            <div>Rating: {rating}/5</div>
            <div>Location: {location.address1}</div>
             <img src={image_url}></img>
        </div>
    )
}

export default Results;