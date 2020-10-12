import React,{useState} from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {FlexRow,LightParagraph,SmallText ,FlexCol,ButtonLink,RawLink,H1,Border,Card} from '../../../Style/global'

const ShipingInfo=()=> {
        const [shippingOptions, setshippingOptions] = useState([
            {title:"International Economy (up to 25 days)",price:15.34},
            {title:"USPS Priority Mail International ",price:52.99},
            {title:"USPS Priority Mail Express International",price:72.24},
            {title:"DHL Express",price:85.98}
        ])
        const [selectedIndex, setselectedIndex] = useState(0)
    
    const RadioGroup=()=>{
        const RadioItem = ({title,price,index})=>{
            return <FlexCol>
                  <FlexRow no100={true} justify="space-between" css={css`cursor: pointer;padding:1rem;`} onClick={e=>setselectedIndex(index)} >
                      <FlexRow no100={true} justify="flex-start">
                          { selectedIndex == index  
                          ? <i css={css`color:var(--colorGreyDark);margin-right:1rem;`} className="fas fa-dot-circle"></i> 
                          : <i css={css`color:var(--colorGreyLight);margin-right:1rem;`}  className="far fa-circle"></i>}
                          <LightParagraph  size={.8} mgb={0} >{title}</LightParagraph>
                      </FlexRow>
                      <SmallText  css={css`font-weight:bold;`}>${price}</SmallText>
                  </FlexRow>
                  {index < (shippingOptions.length-1)?<Border css={css`margin-bottom:0;`} />:null}
            </FlexCol>
        
        }
        return (
            <Card>
              {shippingOptions.map((option,index)=><RadioItem key={index} index={index} title={option.title} price={option.price}  />)}
            </Card>
        )
    }
    return (
        <div>
           <Card>
              <FlexRow   css={css`padding:1rem;`} >
                  <LightParagraph size={.8} mgb={0} >Contact</LightParagraph>
                  <LightParagraph size={.8} mgb={0} >sad_fatah@outlook.com</LightParagraph>
                  <RawLink to="checkout/information">Change</RawLink>
               </FlexRow>
               <Border css={css`margin-bottom:0;`}/>
               <FlexRow   css={css`padding:1rem;`} >
                    <LightParagraph size={.8} mgb={0} >Contact</LightParagraph>
                    <LightParagraph size={.8} mgb={0} >ASKJALKSLASA, ASASA, 4500 OUARZAZATE , Morocco</LightParagraph>
                    <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>
           </Card>

           <LightParagraph mgt={2} mgb={1} >Shipping method</LightParagraph>
           <RadioGroup/>

           <FlexRow >
               <RawLink to="/checkout/information" size={1}>
                     <i class="fas fa-angle-left iconeB"></i>
                     Return to information
               </RawLink>
               <ButtonLink width="400px"> Continue to payment</ButtonLink>
           </FlexRow>
        </div>
    )
}

export default ShipingInfo
