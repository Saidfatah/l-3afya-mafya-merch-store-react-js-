import React,{useState,useEffect,useContext} from 'react'
import {FlexRow,BlackTitle,LightParagraph,Button,Border ,RawLink,Card} from '../../../Style/global'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {CartContext} from '../../../Context/CartProvider'
import axios from 'axios'
import {CheckOutAddressContext} from '../../../Context/CheckoutAddress'
import {CardElement,useElements,useStripe} from '@stripe/react-stripe-js'
import {jwtCheck,getUser} from '../../Auth/Auth'

const CheckoutPayment=(props)=> {
    const [productsToProcces, setproductsToProcces] = useState([])
    const {cart} = useContext(CartContext)
    const {billingDetails,shippingCost,shippingMethod} = useContext(CheckOutAddressContext)
    const [isproccessing, setisproccessing] = useState(false)

    const elements=useElements()
    const stripe=useStripe()

    useEffect(() => {
         setproductsToProcces(cart.map(item=>({ title:item.itemName, price:item.itemPrice, quantity:item.quantity, images:item.images})))
    }, [])

    const handleFormSubmit=async (e)=>{
             e.preventDefault();
             try {
                const billing_details={...billingDetails}
                setisproccessing(true)
 
                
                const amount =productsToProcces.map(item=>item.price * item.quantity).reduce((a, b)=> a + b , 0) 
                const paymentIntentResponse=await  axios.post('http://localhost:4000/stripe/payment_intent',{amount:amount*100})
              
                
                const cardElement = elements.getElement(CardElement)
                const paymentMethodReq=await stripe.createPaymentMethod({
                    type:'card',
                    card:cardElement,
                    billing_details:billing_details,
                })
                
                const confimrPayment =await stripe.confirmCardPayment(paymentIntentResponse.data,{
                    payment_method:paymentMethodReq.paymentMethod.id,

                })
                
                if(confimrPayment.paymentIntent.status != "succeeded") throw new Error("PROCCESSING_FAILED")
                console.log(confimrPayment.paymentIntent.status=="succeeded")

              

                const order ={
                    orders:[cart.map(item=>({product:item.itemId,quantity:item.quantity}))],
                     clientId : jwtCheck() ? JSON.parse(getUser()).id : "noId" ,
                     date:new Date(Date.now()),
                     cost:amount,
                     billing_details
                }
                const saveOrderResponse=await  axios.post('http://localhost:4000/order',{...order})
                console.log(saveOrderResponse)

                setisproccessing(false)
            } catch (error) {
                console.log(error)
                if(error.message=="PROCCESSING_FAILED")
                {
                    console.log("couldn't proccess payments ")
                }
                setisproccessing(false)
            }
             //confirm card payment 
             //combine paymetn methid id and use client secret 

    }

    return (
        <div>
            <Card >
               <FlexRow no100={true} justify="space-between" css={css`padding:1rem;`}  >
                  <LightParagraph size={.8} mgb={0} css={css`width:100px;`}>Contact</LightParagraph>
                  <LightParagraph size={.8} mgb={0}>{billingDetails.email}</LightParagraph>
                  <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>

               <Border css={css`margin-bottom:0;`} />
               <FlexRow no100={true} justify="space-between" css={css`padding:1rem;`}  >
                    <LightParagraph size={.8} mgb={0} css={css`width:100px;`}>Contact</LightParagraph>
                    <LightParagraph size={.8} mgb={0}>
                    {
                     billingDetails.address.line1+ ','+
                     billingDetails.address.postal_code+ ' '+
                     billingDetails.address.city+ ','+
                     billingDetails.address.country +","
                    }</LightParagraph>
                    <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>

               <Border css={css`margin-bottom:0;`} />
               <FlexRow no100={true} justify="space-between"  css={css`padding:1rem;`} >
                    <LightParagraph size={.8} mgb={0} css={css`width:100px;`} >Method</LightParagraph>
                    <LightParagraph size={.8} mgb={0} >
                         {shippingMethod} 
                         <span   css={css`${styles.bill__total};${styles.smallMoney}`}>${shippingCost}</span>
                    </LightParagraph>
                    <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>
            </Card>
            <Card css={css`padding:1rem;`}>
               <FlexRow justify="space-between"  no100={false}>
                    <BlackTitle > Credit card</BlackTitle>
                     <FlexRow  justify="flex-end" no100={false}>
                         <img src="//cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg" css={styles.cardIcon}/>
                         <img src="//cdn.shopify.com/s/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg" css={styles.cardIcon}/>
                         <img src="//cdn.shopify.com/s/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg" css={styles.cardIcon}/>
                         <img src="//cdn.shopify.com/s/assets/payment_icons/discover-8265cfcac046637b87df7718c1436f6a1e054de3fbbb73c2ae82db1332879ba5.svg" css={styles.cardIcon}/>
                     </FlexRow>
               </FlexRow>
               <form onSubmit={handleFormSubmit}>
                     <CardElement css={styles.stripeCard} />
                     {
                         <Button disabled={isproccessing} type="submit" width ="100%" css={css`margin-top:.5rem;`}>
                            {isproccessing? "proccessing...": "Pay now"}
                        </Button>
                     }
                     
               </form>
            </Card>

          
            <RawLink to="/checkout/information" size={1}><i className="fas fa-angle-left iconeB"></i> Return to shipping</RawLink>
           
        </div>
    )
}

const styles ={
    cardIcon :css` 
    height:30px;
    width:30px;
    margin-right:.25rem;
   
    `,
    stripeCard :css` 
    border:1px solid var(--colorGreyLight) ; 
    border-radius:8px;
    padding:1rem;
    `,
    smallMoney :css` 
    font-size: .9rem;
    color: var(--colorGreyDark);
    `,
    bill__total :css` 
    font-weight: 600;
    `,
}

export default CheckoutPayment
