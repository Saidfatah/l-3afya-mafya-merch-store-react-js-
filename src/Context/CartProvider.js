import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'
export const CartContext =createContext()

function CartProvider(props) {
    let [cart,setCart]=useState([])
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
   
    useEffect(()=>{

    },[cart])
     const removeItem=(itemId)=> setCart(cart.filter(item=>item.itemId != itemId))
     const addItem=(item)=>{
          const itemChek = cart.filter(cartItem=> cartItem.itemName == item.itemName )
          console.log(itemChek)
          if(itemChek[0] != undefined)
          {
           updateQuantityContext(itemChek[0].itemId,itemChek[0].quantity + item.quantity)
          }
          else
          {  
           setCart([...cart,item])
           }
     }
     const updateQuantityContext=(itemId,quantity)=>{
          setCart(cart.map(item=>{
               if(item.itemId == itemId){
                    item.quantity=quantity
                    return item
               }
               return item
             }
          ))
     }
     return (
      <CartContext.Provider value={{ cart, setCart,removeItem,addItem,updateQuantityContext}}>
           {props.children}
      </CartContext.Provider>)
}

export default CartProvider
