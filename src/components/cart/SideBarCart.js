import React ,{createRef,forwardRef,useImperativeHandle}from 'react'
import CartItem from './CartItem'
const SideBarCart=forwardRef((props,ref)=>{
    const cartContainer = createRef()
    const pageShdowCover = createRef()
   
    const slideOut=e=>{
        cartContainer.current.style.right='-400px'
        pageShdowCover.current.style.opacity='0'
        setTimeout(()=>pageShdowCover.current.style.display='none', 600);
    }
    useImperativeHandle(ref, () => ({
        slideIn(){
            pageShdowCover.current.style.display='block'
            cartContainer.current.style.right='0'
            pageShdowCover.current.style.opacity='1'
        }
    }));
    return (
        <div>
            <div className="pageShdowCover" ref={pageShdowCover}></div>
            <div className="SideContainer cart" ref={cartContainer}>
                <div className="cart__top">
                    <h1>Cart</h1>
                    <i className="far fa-times-circle Close" onClick={slideOut}></i>
                </div>
                <div className="cart__body">  
                </div>
        </div>
        </div>
    )
})

export default SideBarCart
