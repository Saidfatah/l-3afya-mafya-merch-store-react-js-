import React from 'react'
import {H1,Container,LightParagraph,Button,FlexWrap,Underlined,Border,FlexItem,SmallText} from '../../../../Style/global'

const Address=({address,modifiable,setdisplayAddressModal,setaddresToModify,index})=> {
    const {firstName, lastName,company,phone,address1,address2,city,country,zipcode,isDefault}=address
    return (
        <FlexItem width="200px" >
            <SmallText>
               {
                   isDefault
                   ?'Default address'
                   :'Address '+index
               }
            </SmallText>
            <Border />
            <LightParagraph mgb={.5}>{firstName + ' ' + lastName}</LightParagraph>
            <LightParagraph mgb={.25}>{company}</LightParagraph>
            <LightParagraph mgb={.25}>{address1}</LightParagraph>
            <LightParagraph mgb={.25}>{address2}</LightParagraph>
            <LightParagraph mgb={.25}>{zipcode + ' ' + city}</LightParagraph>
            <LightParagraph mgb={.25}>{country}</LightParagraph>
            {
                modifiable
                ?<>
                     <Underlined onClick={e=>{setdisplayAddressModal(true);setaddresToModify({...address,index})}} >Edit</Underlined>
                     <Underlined>Delete</Underlined> 
                </>
                :null
            }
            
        </FlexItem>
    )
}

export default Address
