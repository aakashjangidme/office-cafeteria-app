import React from 'react'


export function buildPaymentOptions(k, index) {
    return <div key={index}>
        <h4>{k}</h4>
    </div>
}

const PaymentMethod = (props) => {

    return <div>
        <h2>{props.name}</h2>
        {props.options?.map(buildPaymentOptions)}
    </div>
}


export default PaymentMethod;