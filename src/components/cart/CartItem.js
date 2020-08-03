import React,{useEffect,useState,useContext} from 'react'
import {ImagesContext} from '../../Context/ImagesProvder'
import {CartContext} from '../../Context/CartProvider'

function CartItem(props) {
    
    const {itemName,itemPrice,quantity,itemId}= props.cartItem
    const [imageSrc,setimageSrc]=useState('')
    const [quantityCounter,setQuantity]=useState(1)
    
    const {removeItem,updateQuantityContext} =useContext(CartContext)
    const {getImage} =useContext(ImagesContext)
    useEffect(() => {
                                                                                                                                                                                                                         setQuantity(quantity)
        getImage(itemName).then(src=>{
           setimageSrc('/images/products/'+itemName+'/img1.'+src.data)
        })
     }, [quantity])
     const updateQuantity=e=>{
        const inc = e.target.innerHTML =="+"?1 : (quantityCounter <= 1 ? 0 : -1 );
        setQuantity(quantityCounter +inc )
        updateQuantityContext(itemId,quantityCounter)
    }
    return (
        <div className="cartItem">
            <div className="cartItem__image">
                <img src={imageSrc}  alt="loading ..."/>
            </div>
            <div className="cartItem__info">
                 <div>{itemName}</div>
                 <div>{itemPrice}</div>
                 <div className="cartItem__action">
                     <div className="quantity">
                         <span className="quantity__icon" onClick={updateQuantity}>-</span>
                         <input type="text" onChange={e=>e.preventDefault()} value={quantityCounter}/>
                         <span className="quantity__icon" onClick={updateQuantity}>+</span>
                     </div>
                     <a  className="btn link-underlined" onClick={e=>removeItem(itemId)}>remove</a>
                 </div>
            </div>

        </div>
    )
}

export default CartItem
