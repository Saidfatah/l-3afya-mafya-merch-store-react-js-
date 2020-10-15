import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Container,H1,LightTitle,FlexCol,LightParagraph,LightList,BlackHighlight,BlackTitle} from '../../../Style/global'

const Contact=()=> {
    return (
     <Container verticalCenter>
          <FlexCol width="500px">
                 <H1 mgb={3} mgt={2} >CUSTOMER SERVICE</H1>
                 <BlackTitle>CONTACT</BlackTitle>
                 <BlackHighlight>Afyamafa@GMAIL.COM</BlackHighlight>
                 <LightParagraph>Questions or concerns? We currently offer customer service support Monday – Friday from 9AM to 5PM.</LightParagraph>
                 <LightParagraph>When emailing our customer service department, please do the following :</LightParagraph>
                 <LightList>
                     <li>State your Name and Order Number (If available)</li>
                     <li>Leave your Message or Question</li>
                     <li>Please leave your Phone and Email address</li>
                 </LightList>
                 <LightParagraph mgb={4}>Please allow up to 24 hours for a response to your inquiry. Emails sent during non-office hours will be handled on our next business day.</LightParagraph>


 
                <BlackTitle>RETURN POLICY</BlackTitle>
                <LightTitle>Exchanges</LightTitle>
                <LightParagraph>
                    We do accept exchanges for items that are purchased at retail price. All discounted items 
                    and sale items are final sale. Please send us a request for an exchange within 14 days of delivery date. 
                    Items must be returned in new and  unused condition, with all original tags attached. All exchanges are 
                    dependent on existing stock.
                </LightParagraph>
                <LightParagraph>To make an exchange please do the following :</LightParagraph>
                <LightList>
                     <li>Email us with the subject title of the email stating “Exchange”</li>
                     <li>Provide us with your Name, Order Number and Phone Number.</li>
                     <li>Reason for exchange</li>
                     <li>Briefly tell us the item you want to exchange and what you want in its place.</li>
                     <li>Once email is sent expect a reply within 24 hours with further instruction.</li>
                </LightList>
                
                <LightTitle>Damaged Goods</LightTitle>
                <LightParagraph>If a product is delivered damaged or defective please do the following : </LightParagraph>
                <LightParagraph>To make an exchange please do the following :</LightParagraph>
                <LightList>
                     <li>Send an email titled "Damaged"</li>
                     <li>Email us a photo of the damaged goods</li>
                     <li>State where the product is damaged</li>
                     <li>Please include Name, Order Number and Phone Number</li>
                     <li>Once email is sent expect a reply within 24 hours with further instruction.</li>
                </LightList>
                <LightParagraph  mgb={4}>* A refund won’t be made for the damaged item unless the item can’t be replaced. *</LightParagraph>



                <BlackTitle>SHIPPING/DELIVERY</BlackTitle>
                <LightTitle>EXPEDITED SHIPPING METHODS DO NOT INCLUDE PROCESSING TIME. </LightTitle>
                <LightParagraph >
                     Purchased items will be shipped from our warehouse location within 4-7 business days of the order,
                     although most orders will be shipped within 2-3 business days.
                </LightParagraph>
                <LightParagraph >
                     Shipping prices are determined straight from the carriers. The cost of the shipping depends 
                     on the weight of your entire order and its destination 
                     from our warehouse location at 9009 NW 105th Way, Medley, FL 33178
                </LightParagraph>
                <LightParagraph >
                     Domestic (USA): All domestic orders are shipped via USPS with delivery confirmation.
                     Standard delivery time is 2-5 business days from date shipped,
                     but may take longer. Most domestic orders are received within 1 week of ship date.
                </LightParagraph>
                <LightParagraph >
                     International: International customers are responsible for customs duties and/or brokerage fees in addition
                     to shipping costs assessed during checkout. afiya  Mafia is not responsible for international 
                     shipping delays, such as customs delays and is not responsible for any customs duties or taxes fees 
                     (if the package is shipped back because the customs payment was not paid we are not able to refund your order).
                     We are not responsible for any lost, stolen, or damaged shipments. The buyer assumes all responsibilities
                     of claims made with the shipping carrier and all duties/fees incurred on the shipment. 
                </LightParagraph>
          </FlexCol>
    </Container>
    )
}

export default Contact
