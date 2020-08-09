import React from 'react'
import {Grid,Button,FormControlLabel,Radio,RadioGroup,Card} from '@material-ui/core';
import {Link} from "react-router-dom";

function CheckoutPayment(props) {
    const {method}=props
    return (
        <div>
            <Card className="checkoutCard" variant="outlined">
               <Grid container direction="row"   justify="space-between"  alignItems="center">
                  <span className="smallTextG">Contact</span>
                  <span className="smallTextB">sad_fatah@outlook.com</span>
                  <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
               <div className='border'></div>
               <Grid container direction="row"   justify="space-between"  alignItems="center">
                    <span className="smallTextG">Contact</span>
                    <span className="smallTextB">ASKJALKSLASA, ASASA, 4500 OUARZAZATE , Morocco</span>
                    <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
               <div className='border'></div>
               <Grid container direction="row"   justify="space-between"  alignItems="center">
                    <span className="smallTextG">Method</span>
                    <span className="smallTextB">
                         {method || 'DHL Express'} 
                         <span className="bill__total smallMoney">$100.37</span>
                    </span>
                    <Link to="checkout/information" className="raw__Link">Change</Link>
               </Grid>
           </Card>
            <Grid container direction="row"   justify="space-between"  alignItems="center">
               <Link to="/checkout/information" className="raw__Link"><i class="fas fa-angle-left iconeB"></i>Return to shipping</Link>
               <Button variant="contained" color="primary"  className="btnGrey"> Pay now</Button>
           </Grid>
        </div>
    )
}

export default CheckoutPayment
