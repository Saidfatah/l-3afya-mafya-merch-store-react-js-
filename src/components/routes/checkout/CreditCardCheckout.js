import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function CreditCardCheckout(props) {
    const {products}=props

    const handelToken=async(token)=>{
        const res =await  axios.post('http://localhost:4000/stripe/checkout',{
           token,
           product:{
             products:products.map(p=>p.title),
             amount:products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)*100
           }
         })
}
    return (
        <div>
            <StripeCheckout 
          stripeKey='pk_test_51HCsVhLkAIHmcekiVfb5aSOF75eJPLKwn7MhbxmQKMVtJrworoCsyNL8Otxs0cdcFYjKMpjejHzChey00DlIkW8b007nxn9KYC'
          token={handelToken}
          billingAddress
          shippingAddress
          amount={products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)*100}
          />
        </div>
    )
}

export default CreditCardCheckout
