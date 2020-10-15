import React,{useState,useContext,useEffect} from 'react'
import {CartContext} from '../../../Context/CartProvider'
import {CheckOutAddressContext} from '../../../Context/CheckoutAddress'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Border } from '../../../Style/global'

const CheckoutOverview=()=> {
    const {shippingCost} =useContext(CheckOutAddressContext)
    const {cart} = useContext(CartContext)
    const [products,setProducts]=useState([])
    useEffect(()=>{
     setProducts(cart.map(item=>({ title:item.itemName, price:item.itemPrice, quantity:item.quantity, images:item.images})))
    },[products.lenght>0])

    return (
       <div  css={styles.checkout__overview}>
        <div > 
             {
               products.map((item,index)=><div key={index}  css={styles.overview__item}>
                     <div css={styles.item__identity}>
                         <div  css={styles.item__image}>
                             <img src={'/images/products/'+item.title+'/'+item.images[0]} />
                             <div  css={styles.item__quantity}>{item.quantity}</div>
                         </div>
                         <div  css={styles.item__title}><span>{item.title}</span></div>
                     </div>
                     <div  css={css`${styles.item__price};${styles.smallMoney}`} >${item.price * item.quantity}.00 </div>
                 </div>)
             }
        </div>
       <Border color="var(--colorGreyLight)" />
        <div css={styles.overview__line}> 
              <div>SubTotal</div>
              <div>  
                  <span  css={css`${styles.bill__total};${styles.smallMoney}`}>
                  ${products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)}
                  .00
                  </span> 
              </div>
        </div>
        <div css={styles.overview__line}> 
              <div>Shinping</div>
              {
                  shippingCost > 0 
                  ? <span css={css`${styles.bill__total};${styles.smallMoney}`}>${shippingCost}.00</span> 
                  :<span css={styles.currency}>Calculated at next step</span> 
              }
              
        </div>
       <Border color="--colorGreyLight" />
        <div css={styles.overview__line}> 
            <div>Total</div>
            <div> 
                <span css={styles.currency}>USD</span>
                <span  css={css`${styles.bill__total};${styles.bigMoney}`}>
                 ${products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0) + shippingCost}.00
                 </span> 
            </div>
        </div>
    </div>
    )
}

const styles ={
    checkout__overview :css` 
    flex:3;
    padding: 2rem;
    background: #fafafa;
    border-left: 1px solid rgb(204, 204, 204) ;
    `,
    overview__item :css` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    `,
    item__identity :css` 
    display: flex;
    align-content: center;
    align-items: center;
    `,
    item__image :css` 
    height: 65px;
    width: 65px;
    border-radius: 10px;
    border: 1px solid rgb(204, 204, 204);
    position: relative;
    img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 100%;
      }
    `,
    item__quantity :css` 
    background-color: rgb(126, 126, 126);
    justify-content: center;
    align-items: center;
    font-size: .8rem;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    display: flex;
    color:#fff;
    height: 20px;
    width: 20px;
    right:-10px;
    z-index: 99;
    top:-10px;
    `,
    item__title :css` 
    font-weight: 600;
    margin-left: 1rem;
    `,
    item__price :css` 
    font-weight: 600;
    `,
    smallMoney :css` 
    font-size: .9rem;
    color: var(--colorGreyDark);
    `,
    bill__total :css` 
    font-weight: 600;
    `,
    bigMoney :css` 
    font-size: 1.5rem;
    color: var(--colorGreyDark);
    `,
    currency :css` 
    color: rgb(161, 161, 161);
    font-size: .8rem;
    `,
    overview__line :css` 
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    div{
        font-size: .9rem;
        color: rgb(116, 116, 116);
      }
    `,
}
export default CheckoutOverview
