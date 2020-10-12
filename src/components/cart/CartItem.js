import React,{useEffect,useState,useContext} from 'react'
import {CartContext} from '../../Context/CartProvider'
import Quantity from '../layout/Quanitity'
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
                 <FlexRow justify="space-between">
                     <Quantity {...{updateQuantity,quantity,small:true}}/>
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
    quantity :css` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.65;
    height:40px;
    width: 98px;
    margin-right: 2rem;`,
    quantity__icon :css`cursor: pointer;
    font-size: 1.25rem;`,

}

export default CartItem
