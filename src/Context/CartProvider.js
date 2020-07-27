import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'
export const CartContext =createContext()

function CartProvider(props) {
    let [cart,setCart]=useState([])
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
    const apicall =(route,calb)=>axios.get(apiurl+route).then(res=>calb(res.data)).catch(errhandler)
   
    useEffect(()=>{
    console.log("changing state ")

    },[cart])

     return (
      <CartContext.Provider value={{ cart, setCart}}>
           {props.children}
      </CartContext.Provider>)
}

export default CartProvider
