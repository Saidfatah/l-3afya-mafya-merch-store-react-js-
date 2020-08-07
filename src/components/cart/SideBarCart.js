import React ,{createRef,useContext,useEffect}from 'react'
import CartItem from './CartItem'
import {CartContext} from '../../Context/CartProvider'
import ImagesProvder from '../../Context/ImagesProvder'
import {Link} from "react-router-dom";


function SideBarCart(props){
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

    return (
        <div>
            <div className="pageShdowCover"  ref={pageShdowCover} onClick={slideOutOut} ></div>
            <div className="SideContainer cart" ref={cartContainer}>
                <div className="cart__top">
                     <h1>Cart</h1>
                     <i className="far fa-times-circle Close" onClick={slideOutOut}></i>  
                </div>
                <div className="cart__body">  
                    <ImagesProvder>
                         {cart.length>0? cart.map((item,index)=><CartItem key={index} cartItem={item}/>) :<div className="cart__empty"><div> Your cart is empty</div></div>}
                    </ImagesProvder>
                </div>
                <div className="cart__bottom">  
                     {cart.length>0?<div>
                       <h2>Shipping & taxes calculated at checkout</h2>
                       <Link className="btn" to="/checkout">CHECKOUT .  {cart.map(item=>item.itemPrice * item.quantity).reduce((a, b)=> a + b , 0)}</Link>
                     </div>:'no cart items'}
                     
                     
                </div>
            </div>
        </div>
    )
}
export default SideBarCart
