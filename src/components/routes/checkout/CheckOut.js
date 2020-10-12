import React,{useState,useContext,useEffect,useRef} from 'react'
import {CartContext} from '../../../Context/CartProvider'
import InfoFrom from './InfoFrom'
import ShipingInfo from './ShipingInfo'
import {Switch,Route,useRouteMatch,Link} from "react-router-dom";
import CheckoutPayment from './CheckoutPayment'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {FlexRow ,RawLink,ButtonLink} from '../../../Style/global'

const CheckOut=()=> {
    const [products,setProducts]=useState([])
    const {cart} = useContext(CartContext)
    const LinksRef= useRef()
    let {  path,url } = useRouteMatch();

    useEffect(()=>{
     setProducts(cart.map(item=>({ title:item.itemName, price:item.itemPrice, quantity:item.quantity, images:item.images})))
    },[products.lenght>0])
   
    const CheckoutOverview=()=>{
        return <div  css={styles.checkout__overview}>
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
        <div  css={styles.border}></div>
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
              <div> <span css={styles.currency}>Calculated at next step</span>  </div>
        </div>
        <div  css={styles.border}></div>
        <div css={styles.overview__line}> 
            <div>Total</div>
            <div> 
                <span css={styles.currency}>USD</span>
                <span  css={css`${styles.bill__total};${styles.bigMoney}`}>
                 ${products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)}.00
                 </span> 
            </div>
        </div>
    </div>
    }
    const CheckOutRouter=()=>{
        return  <div  css={styles.checkout__gateways}>
            <FlexRow  checkout={true}  ref={LinksRef} >
                 <RawLink to="/cart" > Cart</RawLink>
                 <i className="fas fa-angle-right"></i>
         
                 <RawLink to={`${url}/information`} active={windowHref.indexOf("/information")!=-1}> Information </RawLink>
                 <i className="fas fa-angle-right"></i>
         
                 <RawLink to={`${url}/shipping`} active={windowHref.indexOf("/shipping")!=-1}> Shipping </RawLink>
                 <i className="fas fa-angle-right"></i>
         
                 <RawLink to={`${url}/payment`} active={windowHref.indexOf("/payment")!=-1}> Payment </RawLink>
            </FlexRow>
         
           <Switch>
               <Route path={`${path}/information`}>
                  <InfoFrom />
               </Route>
               <Route path={`${path}/shipping`}>
                  <ShipingInfo />
               </Route>
               <Route path={`${path}/payment`}>
                  <CheckoutPayment />
               </Route>
            </Switch>
         
         </div>
    }
    const windowHref=  window.location.href
  
    return (
    <div css={styles.checkout}>
         <CheckOutRouter />
         <CheckoutOverview />
     </div>
    )
}

const styles ={
    checkout :css` 
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    `,
    checkout__gateways :css` 
    flex: 4;
    height: fit-content;
    padding: 2rem 4rem;
    `,
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
    border :css` 

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
export default CheckOut
