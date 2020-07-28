import React,{useEffect,useState,useContext} from 'react'
import {ImagesContext} from '../../Context/ImagesProvder'

function CartItem(props) {
    const {itemName,itemPrice}= props.cartItem
    const [imageSrc,setimageSrc]=useState('')
    const [quantity,setQuantity]=useState(1)

    const {getImage} =useContext(ImagesContext)
    useEffect(() => {
       getImage(itemName).then(src=>{
           setimageSrc('/images/products/'+itemName+'/img1.'+src.data)
       })
     }, [])
     const updateQuantity=e=>{
        const inc = e.target.innerHTML =="+"?1 : (quantity <= 1 ? 0 : -1 );
        setQuantity(quantity +inc )
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
                         <input type="text" onChange={e=>e.preventDefault()} value={quantity}/>
                         <span className="quantity__icon" onClick={updateQuantity}>+</span>
                     </div>
                     <a  className="btn link-underlined">remove</a>
                 </div>
            </div>

        </div>
    )
}

export default CartItem
