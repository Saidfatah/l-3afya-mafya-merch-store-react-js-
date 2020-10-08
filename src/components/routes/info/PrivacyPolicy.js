import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Container,H1,LightTitle,LightParagraph} from '../../../Style/global'

const PrivacyPolicy=()=> {
    return (
        <Container>
            <H1 mgb={3} mgt={2} >PRIVACY POLICY</H1>
            <LightParagraph>
             Your privacy is extremely important to us. To better protect your privacy
             we provide this notice explaining our online information practices and the choices you can 
             make regarding the way your information is collected and used. To make this notice easily 
             accessible, we make it available on our homepage, and at any point in which personally identifiable 
             information may be requested from our site. 
            </LightParagraph>

            <LightTitle>Our Commitment to Privacy of Minors</LightTitle>
            <LightParagraph>
             Furthermore, protecting the privacy of individuals under the age of 18 is an especially important aspect of our company’s privacy
             policy. For that reason, AfyaMafia will never, under no circumstances, collect or retain any
             information within our website or database from those definitively identifiable as a minor, and in no 
             way is our website structured or worded in an attempt to attract such individuals falling under the age 
             of 13, or under the age of 18 whom do not have parent or guardian supervision and/or permission. Under 
             our Terms of Service, individuals under the age of 13, including those under 18 without parent or guardian
             supervision and/or permission, are strictly prohibited from accessing our site and the services offered therein.
            </LightParagraph>

            <LightTitle>Collection of Personal Information</LightTitle>
            <LightParagraph>
                 Upon visiting afyamafya.com, the IP address of the computer used to access 
                 our site will be logged along with the dates and times of access. This information is
                 ONLY used to analyze trends, track user movement, and gather broad demographic information
                 for general administrative and analytical purposes. Most importantly, any recorded IP address 
                 is never, under no circumstance, attributed to any sensitive or personally identifiable information of the visitor.
            </LightParagraph>


            <LightTitle>Changes to Privacy Statement</LightTitle>
            <LightParagraph>
                The contents of our privacy statement are subject to change at any given time 
                and at our discretion. If you have any questions regarding the privacy policy 
                of AfyaMafya then you may contact us at Afyamafa@gmail.com
            </LightParagraph>

        </Container>
    )
}

const styles = {
    lightTitle:css`
         color:var(--colorGrey);
         font-size:1.2rem;
         margin-bottom:1.5rem;
         
    `,
    lightParagraph:css`
         color:var(--colorGrey);
         font-size:.8rem;
         margin-bottom:2rem
    `,
}

export default PrivacyPolicy
