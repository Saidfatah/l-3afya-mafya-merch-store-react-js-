import React ,{createContext,useState} from 'react'
export const CheckOutAddressContext =createContext()

const CartProvider=(props)=> {
    let [billingDetails,setbillingDetails]=useState({
        name:"SAID FATAH",
        email:"said_designer@outlook.com",
        phone:"0662177517",
        address:{
            country:"MA",
            city:"OUARZAZATE",
            line1:"ouarzazate103",
            line2:"ouarzazate103",
            state:"Daraa tafilllalt",
            postal_code:45000
        }
    })
    const [shippingMethod, setshippingMethod] = useState("DHL Express")
    const [shippingCost, setshippingCost] = useState(0)


     
     return (
      <CheckOutAddressContext.Provider value={{billingDetails,setbillingDetails,shippingMethod, setshippingMethod,shippingCost, setshippingCost}}>
           {props.children}
      </CheckOutAddressContext.Provider>)
}

export default CartProvider
