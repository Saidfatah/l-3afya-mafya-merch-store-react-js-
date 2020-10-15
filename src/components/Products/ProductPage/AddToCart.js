import React,{useState,useContext,useEffect} from 'react'
import {CartContext} from '../../../Context/CartProvider'
import {MyContext} from '../../../Context/ProductsProvider'
import {Button} from '../../../Style/global'

const AddToCart=(props)=> {
    const {id,quantity, setSlideNow}=props
    const [product,setProduct]=useState({})
    const {getProductById} =useContext(MyContext)
    const {cart,addItem} = useContext(CartContext)
    const {title,images,price} = product ;

    const addToCart = e=> {
        addItem({
        itemId:id,
        itemName:title,
        images:images,
        itemPrice :price ,
        quantity:quantity 
        })
        setSlideNow(true)
        document.body.style.overflowY="hidden"
    }
   
    useEffect(()=>{getProductById(id).then(res=>setProduct(res.data))},[id])
   
   return (<Button type="submit" disabled={product.title==undefined} width="100%" marginTop={1} onClick={addToCart}> ADD TO CART</Button>)
}

export default AddToCart
