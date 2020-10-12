import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Order from '../Order'
import Address from './Address'
import {logOut,getUser} from "../../../Auth/Auth"
import {H1,Container,LightParagraph,Button,FlexRow,Border,Underlined,FlexItem,SmallText} from '../../../../Style/global'
import {Link} from 'react-router-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/core'


const Customer=({history})=> {
    let [orders,setOrders]=useState([])

    useEffect(()=>{
        const sourse = axios.CancelToken.source();
        (async()=>{
             try {
                 const user =JSON.parse(getUser())
                 axios.get("http://localhost:4000/order",{cancelToken:sourse.token,userId:user.id})
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
             <H1 >customer</H1>
             <Underlined onClick={logOut}>Logout</Underlined> 
             <LightParagraph>Welcome back, {JSON.parse(getUser()).firstname}!</LightParagraph>
            <FlexRow>
                 <FlexItem flex={3}> 
                       <SmallText>My orders({orders.length})</SmallText>
                        <Border />
                        { orders.length>0 
                            ?orders.map((order,index)=><Order key={index} order={order} />)
                            :<LightParagraph>You have no orders </LightParagraph>
                        }
                 </FlexItem>
                 <FlexItem flex={1}>
                      
                       {
                           JSON.parse(getUser()).addresses.length>0
                           ?<SmallText>Default Address</SmallText>
                           : <SmallText>No addresses</SmallText>
                       }
                       <Border />
                       {
                           JSON.parse(getUser()).addresses.length>0
                           ?<Address  address={JSON.parse(getUser()).addresses[0]} />
                           :<LightParagraph>No addresses are currently saved</LightParagraph>
                       }
                       
                       <Button width="100%">
                            <Link to="/addresses" css={css`color:#fff;`} > MANAGE ADDRESSES</Link>
                       </Button>
                 </FlexItem>
            </FlexRow>
        </Container>
    )
}

export default Customer
