import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Order from '../Order'
import {getUser} from "../../../Auth/Auth"
import {H1,Container,LightParagraph,Button,FlexRow,Border,FlexItem,SmallText} from '../../../../Style/global'


const Customer=(props)=> {
    let [orders,setOrders]=useState([])

    useEffect(()=>{
        const sourse = axios.CancelToken.source();
        (async()=>{
             try {
                 const user =JSON.parse(getUser())
                 console.log(user)
                 axios.get("http://localhost:4000/order",{cancelToken:sourse.token,userId:user.id})
                 .then(res=>{
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
             <H1 >customer</H1>
             <LightParagraph>Welcome back, {JSON.parse(getUser()).firstname}!</LightParagraph>
            <FlexRow>
                 <FlexItem flex={3}> 
                       <SmallText>My orders({orders.length})</SmallText>
                        <Border />
                        {   orders.length>0 ?
                        orders.map((order,index)=><Order key={index} order={order} />)
                        :<LightParagraph>You have no orders </LightParagraph>
                         }
                 </FlexItem>
                 <FlexItem flex={1}>
                       <SmallText>No addresses</SmallText>
                       <Border />
                       <LightParagraph>No addresses are currently saved</LightParagraph>
                       <Button  width="100%">MANAGE ADDRESSES</Button>
                 </FlexItem>
            </FlexRow>
        </Container>
    )
}

export default Customer
