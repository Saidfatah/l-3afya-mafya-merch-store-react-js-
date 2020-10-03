import React from 'react'
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";
import {Grid ,Card} from '../../../Style/global'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const CheckoutPayment=(props)=> {
    const {method}=props

    return (
        <div>
            <Card >
               <Grid >
                  <span className="smallTextG">Contact</span>
                  <span className="smallTextB">sad_fatah@outlook.com</span>
                  <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
               <div  css={styles.border}></div>
               <Grid >
                    <span className="smallTextG">Contact</span>
                    <span className="smallTextB">ASKJALKSLASA, ASASA, 4500 OUARZAZATE , Morocco</span>
                    <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
               <div className='border'></div>
               <Grid >
                    <span className="smallTextG">Method</span>
                    <span className="smallTextB">
                         {method || 'DHL Express'} 
                         <span  css={css`${styles.bill__total};${styles.smallMoney}`}>$100.37</span>
                    </span>
                    <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
            </Card>
            <Grid >
               <Link to="/checkout/information" className="raw__Link"><i class="fas fa-angle-left iconeB"></i>Return to shipping</Link>
               <Button variant="contained" color="primary"  className="btnGrey"> Pay now</Button>
           </Grid>
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
