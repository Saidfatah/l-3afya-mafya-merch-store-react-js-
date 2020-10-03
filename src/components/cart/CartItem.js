import React,{useEffect,useState,useContext} from 'react'
import {ImagesContext} from '../../Context/ImagesProvder'
import {CartContext} from '../../Context/CartProvider'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const CartItem=(props)=> {
    const {itemName,itemPrice,quantity,itemId,images}= props.cartItem
    const [imageSrc,setimageSrc]=useState('')
    const [quantityCounter,setQuantity]=useState(1)
    const {removeItem,updateQuantityContext} =useContext(CartContext)


    useEffect(() => {
        setimageSrc('/images/products/'+itemName+'/'+images[0]) ;                                                                                                                                                                                               setQuantity(quantity)
     }, [quantity])

    const updateQuantity=e=>{
        const inc = e.target.innerHTML =="+"?1 : (quantityCounter <= 1 ? 0 : -1 );
        setQuantity(quantityCounter +inc )
        updateQuantityContext(itemId,quantityCounter)
    }

    return (
        <div css={styles.cart_Item}>
            <div css={styles.cartItem__image}>
                <img src={imageSrc}  alt="loading ..."/>
            </div>
            <div css={styles.cartItem__info}>
                 <div>{itemName}</div>
                 <div>{itemPrice}</div>
                 <div css={styles.cartItem__action}>
                     <div css={styles.quantity}>
                         <span  css={styles.quantity__icon} onClick={updateQuantity}>-</span>
                         <input type="text" onChange={e=>e.preventDefault()} value={quantityCounter}/>
                         <span  css={styles.quantity__icon} onClick={updateQuantity}>+</span>
                     </div>
                     <a  className="btn" onClick={e=>removeItem(itemId)}>remove</a>
                 </div>
            </div>

        </div>
    )
}

const styles ={
    cart_Item :css`padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;`,
    cartItem__image :css`width: 100px;
    margin-right: 1rem;
     img{
        width: 100%;
    }
    `,
    cartItem__info :css`font-size: .8rem;
    flex: 2;`,
    cartItem__action :css`margin-top: 1rem;
    display: flex;
    align-items: center;
    `,
    quantity :css` height:40px;
    width: 98px;
    margin-right: 2rem;`,
    quantity__icon :css`cursor: pointer;
    font-size: 1.25rem;`,

}

export default CartItem
