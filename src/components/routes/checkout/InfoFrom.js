import React,{useState,useEffect} from 'react'
import {ButtonLink,FlexRow,RawLink,Input,UnderlinedLink,LightParagraph} from '../../../Style/global'
import AddressForm from '../Account/customer/AddressForm'
import {jwtCheck,getUser} from '../../Auth/Auth'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const  InfoFrom=()=> {
    const [address, setaddress] = useState({
        firstName:'',
        lastName:'',
        company:'',
        phone:'', 
        address1:'',
        address2:'',
        city:'',
        country:'',
        zipcode:'',
        state:'',
        isDefault:false,
    })
   
    useEffect(() => {
        if(jwtCheck())
        {
            setaddress(JSON.parse(getUser()).addresses[0])
        }
    }, [])

    return (
        <div>
            {
                !jwtCheck()
                ?<> 
                <LightParagraph >
                 Contact Informaton, Already have an account? 
                 <UnderlinedLink to="/account" >Login</UnderlinedLink>
                 </LightParagraph>
                 <Input width="100%" placeholder="Email or mobile phone or number" />
                </>
                :<LightParagraph >We'll be using ur default shipping address</LightParagraph>
            }
            
          
            <LightParagraph mgb={1}>Shipping address</LightParagraph>

            <AddressForm  {...{address,setaddress,checkout:true}} />

            <br/>
            <FlexRow justify="space-between">
                <RawLink to="/cart"  size={1}>
                    <i className="fas fa-angle-left iconeB"></i>
                    Return to cart
                </RawLink>
                <ButtonLink to="/checkout/shipping" width="400px"> Continue to shipping</ButtonLink>
            </FlexRow>
        </div>
    )
}

export default InfoFrom
