import React from 'react'


export function buildPriceItem([k, v], index) {
    return <div key={index}>
        <h2>{k} </h2>
        <h2>{v} </h2>
    </div>
}

const FoodMenu = (props) =>

    <div>
        <h2>{props.category}</h2>
        <h2>{props.itemName}</h2>
        {Object.entries(props.price).map(buildPriceItem)}
        <h2>{props.discount}</h2>
        <img src={props.image} alt={props.itemName} />
    </div>
export default FoodMenu;