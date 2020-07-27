import axios from 'axios'
import React ,{useState,useContext,useEffect}from 'react'


import {MyContext} from '../../../Context/ProductsProvider'
function Order(props) {
    let [orderOwner,setOrderOwner]=useState({})

    const{order,admin}=props
    const {apiurl}=useContext(MyContext)
    useEffect(()=>{
        console.log(admin)
        axios.get(apiurl+'users/'+order.owner)
             .then(res=>setOrderOwner(res.data))
             .catch(err=>console.log(err))
     },[])

    return (
        <div className="order">
                <div className="order__products">
                    {
                        order.products.map((product,index)=><div key={index}> {product.title} (<span>{product.quantity}</span>)  </div>)
                    }
                </div>
                {admin != undefined ?<div className="clientName"> client name : <span>{orderOwner.firstname +' ' + orderOwner.lastname  }</span></div>:''}  
                <div className="cost"> <span>total cost</span> <span className="cost__money">{order.cost}$</span></div>
            </div>
    )
}

export default Order
