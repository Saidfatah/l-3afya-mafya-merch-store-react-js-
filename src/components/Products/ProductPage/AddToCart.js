import React,{useState,useContext,useEffect} from 'react'
import {CartContext} from '../../../Context/CartProvider'
import {MyContext} from '../../../Context/ProductsProvider'

function AddToCart(props) {
    const {id,selectedSize,quantity}=props
    const [product,setProduct]=useState({})
    const [quantity2,setQuantity]=useState(1)
    const {getProductById} =useContext(MyContext)
    const {cart,setCart} = useContext(CartContext)

    const addToCart = e=>{
        setCart([...cart,{itemName:product.title, itemPrice : product.price , quantity :quantity2 }])
    }

    useEffect(() => {
        getProductById(id).then(res=>{
            setProduct(res)
        })
        console.log(product,cart)
     }, [])
    return (
        <button className="btn" type="submit" onClick={addToCart}>ADD TO CART</button>
    )
}

export default AddToCart
