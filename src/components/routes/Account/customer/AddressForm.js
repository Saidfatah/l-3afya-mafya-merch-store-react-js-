import React,{useState} from 'react'
import {LightParagraph,FlexRow,FlexCol,Input} from '../../../../Style/global'
import Select from '../../../layout/Select'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const AddressForm=({address,setaddress,checkout})=> {
    const [displaySatesSelect, setdisplaySatesSelect] = useState(false)
    
    const selectCountry=e=>{
        setaddress({...address,country:e.value})
        setdisplaySatesSelect(e.value == "United States")
    }
    const selectState=e=>{
        setaddress({...address,state:e.value})
    }
    const handleChange=(field)=>(e)=>setaddress({...address,[field]:e.target.value})


    if(address == undefined) return null ;
    return (
        <form>
            <FlexCol>
                <Input 
                      type="text" 
                      name="firstName"
                      placeholder="First name" 
                      onChange={handleChange('firstName')} 
                      value={address.firstName}
                />
                <Input 
                      type="text" 
                      name="lastName"
                      placeholder="Last name" 
                      onChange={handleChange('lastName')} 
                      value={address.lastName}
                />
                <Input 
                      type="text" 
                      name="company"
                      placeholder="Company" 
                      onChange={handleChange('company')} 
                      value={address.company}
                />
                <Input 
                      type="text" 
                      name="phone"
                      placeholder="Phone" 
                      onChange={handleChange('phone')} 
                      value={address.phone}
                />
                <Input 
                      type="text" 
                      name="address1"
                      placeholder="Address1" 
                      onChange={handleChange('address1')} 
                      value={address.address1}
                />
                <Input 
                      type="text" 
                      name="address2"
                      placeholder="Address2" 
                      onChange={handleChange('address2')} 
                      value={address.address2}
                />
                <Input 
                      type="text" 
                      name="city"
                      placeholder="City" 
                      onChange={handleChange('city')} 
                      value={address.city}
                />
               <FlexRow justify="space-between">
                    <Select selectState={selectCountry} type="country" />
                    <Input 
                      mgb={0}
                      css={css`margin-bottom:0rem;`}
                      type="text" 
                      name="Zip code"
                      placeholder="zipcode" 
                      onChange={handleChange('zipcode')} 
                      value={address.zipcode}
                    />
                </FlexRow>

                {
                    displaySatesSelect
                    ?<Select selectState={selectState} type="state" />
                    :null
                }
                {
                    !checkout
                    ?<FlexRow mgb={0}>
                    <LightParagraph mgb={.5} center={true}>
                        set as default 
                        <Input 
                             type="checkbox" 
                             name="isDefault"
                             checked={address.isDefault}
                             onChange={e=>{
                                 console.log(e.target.value)
                                 setaddress({...address,isDefault:!address.isDefault})
                             }} 
                        />
                    </LightParagraph>
                  </FlexRow>
                    :""
                }
                
               
            </FlexCol>
        </form>
    )
}

export default AddressForm
