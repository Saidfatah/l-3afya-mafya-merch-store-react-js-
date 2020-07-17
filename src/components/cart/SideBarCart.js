import React ,{createRef} from 'react'
import CartItem from './CartItem'
function SideBarCart() {
    const cartContainer = createRef()
    const pageShdowCover = createRef()
    const slideIn=e=>{
        pageShdowCover.current.style.display='block'
        cartContainer.current.style.right='0'
        pageShdowCover.current.style.opacity='1'

    }
    const slideOut=e=>{
        cartContainer.current.style.right='-400px'
        pageShdowCover.current.style.opacity='0'
        setTimeout(()=>pageShdowCover.current.style.display='none', 600);
    }
    return (
        <div>
            <div className="pageShdowCover" ref={pageShdowCover}></div>
            <div className="SideContainer cart" ref={cartContainer}>
                <div className="cart__top">
                    <h1>Cart</h1>
                    <i class="far fa-times-circle Close" onClick={slideOut}></i>
                </div>
                <div className="cart__body">  
                </div>
        </div>
        </div>
    )
}

export default SideBarCart
