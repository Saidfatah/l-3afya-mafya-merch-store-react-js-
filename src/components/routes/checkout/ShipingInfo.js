import React from 'react'
import {Grid,Button,FormControlLabel,Radio,RadioGroup,Card} from '@material-ui/core';
import {Link} from "react-router-dom";

function ShipingInfo() {
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
           </Card>
           <h2 className="h-medium mgb1 mgt2">Return to information</h2>
           <Card className="checkoutCard mgb1" variant="outlined">
               <RadioGroup row aria-label="position" name="position" defaultValue="International Economy (up to 25 days)">
                   <Grid container direction="row"   justify="space-between"  alignItems="center">
                     <FormControlLabel value="International Economy (up to 25 days)" 
                                       control={<Radio color="primary" />} 
                                       label="International Economy (up to 25 days)" />
                     <div className="bill__total smallMoney">$18.76</div>
                   </Grid>
                   <div className='border'></div>
                   <Grid container direction="row"   justify="space-between"  alignItems="center">
                       <FormControlLabel value="USPS Priority Mail International" 
                                         control={<Radio color="primary" />} 
                                         label="USPS Priority Mail International" />
                       <div className="bill__total smallMoney">$58.18</div>
                   </Grid>
                   <div className='border'></div>
                   <Grid container direction="row"   justify="space-between"  alignItems="center">
                       <FormControlLabel value="USPS Priority Mail Express International" 
                                         control={<Radio color="primary" />} 
                                         label="USPS Priority Mail Express International" />
                       <div className="bill__total smallMoney">$78.13</div>
                   </Grid>
                   <div className='border'></div>
                   <Grid container direction="row"   justify="space-between"  alignItems="center">
                       <FormControlLabel value="DHL Express" 
                                         control={<Radio color="primary" />} 
                                         label="DHL Express" />
                       <div className="bill__total smallMoney">$101.37</div>
                   </Grid>
               </RadioGroup>
            </Card>
           <Grid container direction="row"   justify="space-between"  alignItems="center">
               <Link to="/checkout/information" className="raw__Link">Return to information</Link>
               <Button variant="contained" color="primary"  className="btnGrey"> Continue to payment</Button>
           </Grid>

        </div>
    )
}

export default ShipingInfo
