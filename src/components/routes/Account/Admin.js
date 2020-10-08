import React ,{useState,useContext,useEffect}from 'react'
import Order from './Order'
import axios from 'axios'
import {MyContext} from '../../../Context/ProductsProvider'
import {H1,Container,LightParagraph,Button,FlexRow,Border,FlexItem,SmallText} from '../../../Style/global'

const Admin=()=> {
    let [orders,setOrders]=useState([])

    useEffect(()=>{
        const sourse = axios.CancelToken.source();
        (async()=>{
             try {
                 axios.get("http://localhost:4000/order",{cancelToken:sourse.token})
                 .then(res=>{
                     console.log(res.data)
                     setOrders(res.data)
                 })
                 .catch(err=>console.log(err))
             } catch (error) {
                 if(axios.isCancel(error))console.log('canceled api call ')
                 else throw error
             }
        })()
        return ()=>{
            sourse.cancel()
        }
     },[])


    return (
         <Container nomargin={true}>
         <H1 >admin</H1>
         <LightParagraph>Welcome back, {JSON.parse(getUser()).firstname}!</LightParagraph>
   
         <SmallText>Latest orders</SmallText>
         <Border />
         {   orders.length>0 ?
             orders.map((order,index)=><Order key={index} order={order} />)
             :<LightParagraph>No orders for the moment</LightParagraph>
         }
        
    </Container>
    )
}

export default Admin
