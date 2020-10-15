import React,{useEffect,useState,useContext} from 'react'
import {CartContext} from '../../Context/CartProvider'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Underlined,FlexRow} from '../../Style/global'


const CartItem=(props)=> {
    const {itemName,itemPrice,quantity,itemId,images}= props.cartItem
    const [imageSrc,setimageSrc]=useState('')
    const [quantityCounter,setQuantity]=useState(1)
    const {removeItem,updateQuantityContext} =useContext(CartContext)


    useEffect(() => {
        setimageSrc('/images/products/'+itemName+'/'+images[0]) ;                                                                                                                                                                                               setQuantity(quantity)
     }, [])

    const updateQuantity=e=>{
        e.preventDefault()  
        const inc = e.target.innerHTML =="+"?1 : (quantityCounter <= 1 ? 0 : -1 );
        setQuantity(quantityCounter +inc )
        updateQuantityContext(itemId,quantityCounter +inc)
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
                 <FlexRow justify="space-between">

                 <div css={css`${styles.quantity};${ `height:40px; width: 90px;`}`}>
                      <span css={styles.quantityIcon} onClick={updateQuantity}>-</span>
                      <input type="text" onChange={e=>e.preventDefault()} value={quantity}/>
                      <span css={styles.quantityIcon} onClick={updateQuantity}>+</span>
                 </div>

                 <Underlined onClick={e=>removeItem(itemId)}>remove</Underlined>
                 </FlexRow>
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
   quantity:css`
    border: 1px solid var(--colorGreyLight);
    display: flex;
    padding: 0 .5rem;
    justify-content: space-between;
    align-items: center;
    color:var(--colorGreyLight);
    line-height: 1.65;
    span,input{
        color:var(--colorGreyLight);
    }
    input{
        border: none;
        margin: 0;
        text-align: center;
        width: 35px;
        padding: 0;
    }
    input:focus{
        outline: none;
     }
    `,
    quantityIcon:css`cursor: pointer;
    font-size: 1.25rem;
    `,
}

export default CartItem
