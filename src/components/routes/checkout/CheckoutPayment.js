import React from 'react'
import {FlexRow,ButtonLink,LightParagraph,Border ,RawLink,Card} from '../../../Style/global'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const CheckoutPayment=(props)=> {
    const {method}=props

    return (
        <div>
            <Card >
               <FlexRow no100={true} justify="space-between" css={css`padding:1rem;`}  >
                  <LightParagraph size={.8} mgb={0} css={css`width:100px;`}>Contact</LightParagraph>
                  <LightParagraph size={.8} mgb={0}>sad_fatah@outlook.com</LightParagraph>
                  <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>

               <Border css={css`margin-bottom:0;`} />
               <FlexRow no100={true} justify="space-between" css={css`padding:1rem;`}  >
                    <LightParagraph size={.8} mgb={0} css={css`width:100px;`}>Contact</LightParagraph>
                    <LightParagraph size={.8} mgb={0}>ASKJALKSLASA, ASASA, 4500 OUARZAZATE , Morocco</LightParagraph>
                    <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>

               <Border css={css`margin-bottom:0;`} />
               <FlexRow no100={true} justify="space-between"  css={css`padding:1rem;`} >
                    <LightParagraph size={.8} mgb={0} css={css`width:100px;`} >Method</LightParagraph>
                    <LightParagraph size={.8} mgb={0} >
                         {method || 'DHL Express '} 
                         <span   css={css`${styles.bill__total};${styles.smallMoney}`}>$100.37</span>
                    </LightParagraph>
                    <RawLink to="checkout/information" >Change</RawLink>
               </FlexRow>
            </Card>

            <FlexRow >
               <RawLink to="/checkout/information" size={1}>
                   <i className="fas fa-angle-left iconeB"></i>
                   Return to shipping
              </RawLink>
               <ButtonLink width="400px"> Pay now</ButtonLink>
           </FlexRow>
        </div>
    )
}

const styles ={
    smallMoney :css` 
    font-size: .9rem;
    color: var(--colorGreyDark);
    `,
    bill__total :css` 
    font-weight: 600;
    `,
}

export default CheckoutPayment
