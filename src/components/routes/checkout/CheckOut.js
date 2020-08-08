import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {CartContext} from '../../../Context/CartProvider'
import InfoFrom from './InfoFrom'
function CheckOut() {
    const [products,setProducts]=useState([
        {title:'Hands L',price:30,quantity:2,images:['img1.jpg','img2.jpg']},
        {title:"l'3afya mafya Lighter",price:50,quantity:1,images:['img1.png','img2.png']},
        {title:"L'3afya mafya logo T-Shirt (black)",price:60,quantity:2,images:['img1.png','img2.png']},
      ])
    const {cart} = useContext(CartContext)

    useEffect(()=>{
     setProducts(cart.map(item=>({ title:item.itemName, price:item.itemPrice, quantity:item.quantity, images:item.images})))
     console.log(cart.map(item=>({ title:item.itemName, price:item.itemPrice, quantity:item.quantity, images:item.images})))
    },[products.lenght>0])
    const handelToken=async(token)=>{
    
             const res =await  axios.post('http://localhost:4000/stripe/checkout',{
                token,
                product:{
                  products:products.map(p=>p.title),
                  amount:products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)*100
                }
              })
            console.log(res)
    }

    return (
        <div className="checkout">
        <div className="checkout__gateways">
          <StripeCheckout 
          stripeKey='pk_test_51HCsVhLkAIHmcekiVfb5aSOF75eJPLKwn7MhbxmQKMVtJrworoCsyNL8Otxs0cdcFYjKMpjejHzChey00DlIkW8b007nxn9KYC'
          token={handelToken}
          billingAddress
          shippingAddress
          amount={products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)*100}
          />
          <InfoFrom />
        </div>
        <div className="checkout__overview">
            <div className="overview__items"> 
                 {
                   products.map((item,index)=><div key={index} className="overview__item">
                         <div className="item__identity">
                             <div className="item__image">
                                 <img src={'/images/products/'+item.title+'/'+item.images[0]} />
                                 <div className="item__quantity">{item.quantity}</div>
                             </div>
                             <div className="item__title"><span>{item.title}</span></div>
                         </div>
                         <div className="item__price smallMoney" >${item.price * item.quantity}.00 </div>
                     </div>)
                 }
            </div>
            <div className='border'></div>
            <div className="overview__line"> 
                  <div>SubTotal</div>
                  <div>  <span  className="bill__total smallMoney">${products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)}.00</span> </div>
            </div>
            <div className="overview__line"> 
                  <div>Shinping</div>
                  <div> <span className="currency">Calculated at next step</span>  </div>
            </div>
            <div className='border'></div>
            <div className="overview__line"> 
                  <div>Total</div>
                  <div> <span className="currency">USD</span> <span  className="bill__total bigMoney">${products.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0)}.00</span> </div>
            </div>
        </div>
     </div>
    )
}

export default CheckOut
