import React ,{createRef,forwardRef,useImperativeHandle,useContext,useEffect,statics}from 'react'
import CartItem from './CartItem'
import {CartContext} from '../../Context/CartProvider'


function SideBarCart(props){
    const {setCart,cart} =useContext(CartContext)
    const {slideNow,setSlideNow}=props
    const cartContainer  = createRef()
    const pageShdowCover = createRef()
    const  slideIn=()=>{
        pageShdowCover.current.style.display='block'
        cartContainer.current.style.right='0'
        pageShdowCover.current.style.opacity='1'
     }
    const slideOut=e=>{
        cartContainer.current.style.right='-400px'
        pageShdowCover.current.style.opacity='0'
        pageShdowCover.current.style.display='none'

    }
    useEffect(()=>{
        console.log(cart)
        if(slideNow == true)slideIn()
   
    },[slideNow,cart])
    return (
        <div>
            <div className="pageShdowCover"  ref={pageShdowCover} ></div>
            <div className="SideContainer cart" ref={cartContainer}>
                <div className="cart__top">
                    <h1>Cart</h1>
                   <i className="far fa-times-circle Close" onClick={e=>{slideOut();setSlideNow()}}></i>  
                   <a onClick={e=>{slideOut();}}>x</a>
                </div>
                <div className="cart__body">  
                  {
                      cart.map(item=><CartItem cartItem={item}/>)
                  }
                </div>
            </div>
        </div>
    )
}
export default SideBarCart
