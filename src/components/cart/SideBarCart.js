import React ,{createRef,useContext,useEffect}from 'react'
import CartItem from './CartItem'
import {CartContext} from '../../Context/CartProvider'
import ImagesProvder from '../../Context/ImagesProvder'
import PageCover from '../layout/PageCover'
import {Link} from "react-router-dom";
import {Button} from '../../Style/global'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SideBarCart=(props)=>{
    const {cart} =useContext(CartContext)
    const {slideNow,setSlideNow}=props
    const cartContainer  = createRef()
    const pageShdowCover = createRef()

    const  slideIn=()=>{
        if(cartContainer.current == null ||   cartContainer.current == null) return
        pageShdowCover.current.style.display='block'
        cartContainer.current.style.transition="none"
        pageShdowCover.current.style.transition="none"
        cartContainer.current.style.top=window.scrollY +'px'
        pageShdowCover.current.style.top=window.scrollY +'px'
        setTimeout(() => {
            if(cartContainer.current == null ||   cartContainer.current == null) return
            cartContainer.current.style.transition="all .2s ease-in"
            pageShdowCover.current.style.transition="all .2s ease-in"
            cartContainer.current.style.right='0'
            pageShdowCover.current.style.opacity='1'
        }, 400);
     }
    const slideOut=e=>{
        cartContainer.current.style.right='-400px'
        pageShdowCover.current.style.opacity='0'
        pageShdowCover.current.style.display='none'

    }
    const slideOutOut=e=>{
        slideOut()
        setSlideNow()
        document.body.style.overflowY="scroll" 
    }

    useEffect(()=>{
        if(slideNow == true)slideIn()
    },[slideNow,cart])



    const CheckOutBtn=()=>{
        return  <Link 
         to="/checkout/information"
        
         onClick={slideOutOut}>
             <Button >
                CHECKOUT .$
                {
                cart.map(item=>item.itemPrice * item.quantity).reduce((a, b)=> a + b , 0)
                }
             </Button>
        </Link>
    }
    const Top =()=>{
        return <div css={styles.cart__top}>
        <h1>Cart</h1>
        <i className="far fa-times-circle Close" onClick={slideOutOut}></i>  
   </div>
    }
    const Body =()=>{
        return<div css={styles.cart__body}>  
        <ImagesProvder>
         {cart.length>0
             ? cart.map((item,index)=><CartItem key={index} cartItem={item}/>) 
             :<div css={styles.cart__empty}><div> Your cart is empty</div></div>
         }
        </ImagesProvder>
        <div css={styles.cart__bottom}>  
         {cart.length>0
             ?<div>
               <h2 className="mgb1">Shipping & taxes calculated at checkout</h2>
                <CheckOutBtn />
             </div>
             :'no cart items'
         }
        </div>
    </div>
    }
    
    return (
        <div>
            <PageCover {...{slideOutOut,pageShdowCover}} />
            <Modal ref={cartContainer} right={-400} >
                 <Top />
                 <Body />
            </Modal>
        </div>
    )
}

const styles ={
    cart__body :css`height: calc(100vh - 75px);
    width: 100%;
    position: relative;`,
    cart__bottom :css`position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid var(--colorGreyFaint);
    width: 100%;
    height:fit-content;
    padding: 1rem;
    div{
        display: flex;
        flex-direction: column;
     }
    `,
    cart__top :css`height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid var(--colorGreyFaint);
    `,
    cart__empty :css`width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;`,
    quantity__icon :css`cursor: pointer;
    font-size: 1.25rem;`,
}
export default SideBarCart
