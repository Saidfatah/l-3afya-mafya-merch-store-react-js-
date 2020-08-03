import React ,{useState,useContext,useEffect}from 'react'
import Order from './Order'
import axios from 'axios'
import {MyContext} from '../../../Context/ProductsProvider'
function Admin() {
    let [orders,setOrders]=useState([])
    const {apiurl}=useContext(MyContext)
    useEffect(()=>{
        axios.get(apiurl+'order')
             .then(res=>setOrders(res.data))
             .catch(err=>console.log(err))
     },[orders])

    return (
        <div>
            admin stuff here
            links to products 
            add product link 
            orders notification 
            here we'll have orders
            {orders.map((order,index)=><Order key={index} admin="admin" order={order} />)}
        </div>
    )
}

export default Admin
