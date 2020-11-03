import React ,{createContext,useState,useEffect} from 'react'
import cookie from 'js-cookie'
export const CartContext =createContext()

const CartProvider=(props)=> {
    let [cart,setCart]=useState([])

 
     const removeItem=(itemId)=> setCart(cart.filter(item=>item.itemId != itemId))


     const addItem=(item)=>{
          const itemChek = cart.filter(cartItem=> cartItem.itemName == item.itemName )
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

     const initAndSetCartCookie=()=>{
          let cartCookie= cookie.get('cart')
          if(cartCookie != undefined)
          {   
              cookie.set('cart',[...cart])
          }
          else cookie.set('cart',[])
      } 
  
     useEffect(() => {
          initAndSetCartCookie()
      }, [cart])

     useEffect(() => {
          let mounted = true;
          let  cartCooki =cookie.get('cart')
          if(cartCooki != null &  cartCooki != undefined)
          {
              cartCooki=JSON.parse(cartCooki)
              if(mounted) setCart([...cartCooki])
          }
          return ()=>{mounted=false}
      }, [])
     
     return (
      <CartContext.Provider value={{ cart, setCart,removeItem,addItem,updateQuantityContext}}>
           {props.children}
      </CartContext.Provider>)
}

export default CartProvider
