import React from 'react'
import Login from './Login'
import Customer from './Customer'
import Admin from './Admin'
import SignUp from './SignUp'
import {jwtCheck,logOut,getUserRule,getUser} from "../../Auth/Auth"
/** @jsx jsx */
import { jsx ,css} from '@emotion/core'

const Account=(props)=> {

    return (
        <div css={styles.account}>
             {
                 jwtCheck() ? 
                    <div className="account__profile">
                     <button onClick={logOut}>Logout</button>   
                     {getUserRule() =='admin' 
                        ? <Admin />
                        : <Customer userid={getUser() != null ? getUser().id : 1} />
                    }
                    </div>
                 :props.register? <SignUp/>:<Login/>
              }
        </div>
    )
}
const styles ={
    account:css` 
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    `,
}

export default Account
