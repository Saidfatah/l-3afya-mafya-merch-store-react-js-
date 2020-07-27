import React,{useState,useContext,useEffect} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import axios from 'axios'
import Order from './Order'
function Customer(props) {
    let [orders,setOrders]=useState([])
    const {userid}=props
    const {apiurl}=useContext(MyContext)
    useEffect(()=>{
        axios.get(apiurl+'order/'+userid)
             .then(res=>setOrders(res.data))
             .catch(err=>console.log(err))
     },[])

    return (
        <div>
            customer
            here we'll have orders
            {orders.map((order,index)=><Order key={index} order={order} />)}
        </div>
    )
}

export default Customer
