import React ,{useState}from 'react'
/** @jsx jsx */
import { jsx,css } from '@emotion/core'
import {FlexCol,FlexWrap,LightParagraph,SmallText} from '../../../Style/global'

const Order =(props)=> {
    const{order}=props

    if(order == undefined) return <div>no orders </div>
   
    const OrderItem=({item})=>{
      if(item.images == undefined)return <div >product fecthing error </div> 

       return <div  css={styles.overview__item}>
          <div css={styles.item__identity}>
               <div  css={styles.item__image}>
                   <img src={'/images/products/'+item.title+'/'+item.images[0]} />
                   <div  css={styles.item__quantity}>{item.quantity}</div>
               </div>
           </div>
           <FlexCol mgl={.5} >
                <div  css={styles.item__title}><span>{item.title}</span></div>
                <div  css={css`${styles.item__price};${styles.smallMoney}`} >${item.price * item.quantity}.00 </div>
           </FlexCol>
       </div>
    }

    return (
        <div css={styles.order}>
                <FlexWrap overflow>
                    {
                        order.orders
                        .map(product=>({...product.product,productId:product._id,quantity:product.quantity}))
                        .map((product,index)=><OrderItem item={product} key={index} />)
                    }
                </FlexWrap>
           
               <LightParagraph mgb={0.25}> client name :
               <SmallText>{order.billing_details.name  }</SmallText>
                </LightParagraph>
               
               <LightParagraph mgb={0.25}>  total cost:
               <SmallText>{order.cost}$</SmallText>
                </LightParagraph>
              
        </div>
    )
}

const styles ={
    order:css` 
    box-shadow: 0px 0px 7px 3px rgba(45, 55, 97, 0.2) ;
    margin-bottom:1rem;
    padding:1rem;
    `,
    cost:css` 
    font-size: .8rem;
    `,
    money:css` 
    color: green;
    font-weight:bold;
    `,

    overview__item :css` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:fit-content;
    max-width:300px;
    border-radius: 10px;
    padding:.25rem;
    border: 1px solid rgb(204, 204, 204);
    margin-bottom: .5rem;
    margin-right: .5rem;
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
    `,
    item__price :css` 
    font-size:.9rem;
    color:green;
    `,
    smallMoney :css` 
    font-size: .9rem;
    color: var(--colorGreyDark);
    `,

}

export default Order
