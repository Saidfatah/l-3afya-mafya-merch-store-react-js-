import React,{useState,useContext,useEffect} from 'react'
import {CartContext} from '../../../Context/CartProvider'
import {MyContext} from '../../../Context/ProductsProvider'

function AddToCart(props) {
    const {id,quantity}=props
    const [product,setProduct]=useState({})
    const {getProductById} =useContext(MyContext)
    const {cart,addItem} = useContext(CartContext)
    const addToCart = e=> addItem({itemId:cart.length+1,itemName:product.title, images:product.images,itemPrice : product.price , quantity :quantity })
    useEffect(()=>{getProductById(id).then(res=>setProduct(res.data))},[id])
    return (<button className="btn" type="submit" onClick={addToCart}>ADD TO CART</button>)
}

export default AddToCart
