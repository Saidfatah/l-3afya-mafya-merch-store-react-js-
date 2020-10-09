import React, { useState,useEffect } from 'react'
import {H1,Container,LightParagraph,Button,FlexWrap,Border,FlexItem,SmallText} from '../../../../Style/global'
import AddressModal from './AdressModal'
import Address from './Address'
import {getUser} from '../../../Auth/Auth'

const Adresses=()=> {
    const [addresses, setaddresses] = useState([ ])
    const [displayAddressModal,setdisplayAddressModal]=useState(false)
    const [addresToModify,setaddresToModify]=useState(null)

    const fadeInModal=e=>{
        document.body.style.overflowY="hidden" 
        setdisplayAddressModal(true)
    }
    useEffect(() => {
        const userAddresses= JSON.parse(getUser()).addresses
        if(userAddresses.length>0)
        {
            setaddresses([...userAddresses])
        }
    }, [])

    return (
        <Container>
             <AddressModal {...{displayAddressModal,setdisplayAddressModal,addresToModify,setaddresses,addresses}}/>
             <H1 >My addresses</H1>
             <Button onClick={fadeInModal} >ADD A NEW ADRESS</Button>
             <FlexWrap>
              {
                  addresses.length>0
                  ? addresses.map((address,index)=><Address  key={index}  {...{setdisplayAddressModal,setaddresToModify,address,index:index+1,modifiable:true}}  />)
                  :<LightParagraph>you have no addresses</LightParagraph>
                }
             </FlexWrap>
        </Container>
    )
}

export default Adresses
