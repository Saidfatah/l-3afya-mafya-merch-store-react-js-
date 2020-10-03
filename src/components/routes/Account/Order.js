import axios from 'axios'
import React ,{useState,useContext,useEffect}from 'react'
/** @jsx jsx */
import { jsx,css } from '@emotion/core'
import {MyContext} from '../../../Context/ProductsProvider'

const Order =(props)=> {
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
        <div css={styles.order}>
                <div>
                    {
                        order.products.map((product,index)=><div key={index}> {product.title} (<span>{product.quantity}</span>)  </div>)
                    }
                </div>
                {
                admin != undefined 
                      ?<div> client name : <span>{orderOwner.firstname +' ' + orderOwner.lastname  }</span></div>
                      :''
                }  
                <div css={styles.cost}> 
                     <span>total cost</span> 
                     <span css={styles.money}>{order.cost}$</span>
                </div>
            </div>
    )
}

const styles ={
    order:css` 
    padding: 1rem;
    box-shadow: 0px 0px 10px 3px rgba(45, 55, 97, 0.329) ;
    `,
 
    cost:css` 
    font-size: .8rem;
    `,
    money:css` 
    color: green;
    `,
}
export default Order
