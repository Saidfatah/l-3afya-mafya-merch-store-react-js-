import React from 'react'

function CartItem(props) {
    const {itemName,itemPrice}= props.cartItem
    return (
        <div>
            {itemName} and price is {itemPrice}
        </div>
    )
}

export default CartItem
