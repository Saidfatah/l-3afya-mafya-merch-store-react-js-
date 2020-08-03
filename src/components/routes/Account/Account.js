import React from 'react'
import Login from './Login'
import Customer from './Customer'
import Admin from './Admin'
import SignUp from './SignUp'
import {jwtCheck,logOut,getUserRule,getUser} from "../../Auth/Auth"

function Account(props) {
    console.log('account')
    return (
        <div className="account">
             {
                 jwtCheck() ? 
                    <div className="account__profile">
                     <button onClick={logOut}>Logout</button>   
                     {getUserRule() =='admin' ? <Admin />: <Customer userid={getUser() != null ? getUser().id : 1} />}
                    </div>
                 :props.register? <SignUp/>:<Login/>
              }
        </div>
    )
}

export default Account
