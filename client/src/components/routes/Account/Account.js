import React from 'react'
import Customer from './customer/Customer'
import Admin from './Admin'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { useRouteMatch,Switch,Route} from "react-router-dom";
import {jwtCheck,getUserRule,getUser} from "../../Auth/Auth"
/** @jsx jsx */
import { jsx ,css} from '@emotion/core'

const Account=()=> {
    let { path, url } = useRouteMatch();

    return (
        <div css={styles.account}>
             {
                 jwtCheck() 
                 ? <div className="account__profile">
                     {
                         getUserRule() =='admin' 
                         ? <Admin />
                         : <Customer userid={getUser() != null  ? getUser().id : 1} />
                     }
                    </div>
                 :<Switch>
                     <Route exact path={path}> <Login url={url} /> </Route>
                     <Route path={`${path}/login`}><Login  url={url}/> </Route>
                     <Route  path={`${path}/register`} > <SignUp  url={url}/></Route>
                 </Switch>
              }
        </div>
    )
}
const styles ={
    account:css` 
   
    `,
}

export default Account
