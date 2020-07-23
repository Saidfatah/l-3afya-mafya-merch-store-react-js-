import React from 'react'
import Login from './Login'
import Customer from './Customer'
import Admin from './Admin'
import SignUp from './SignUp'
function Account(props) {
    const jwtCheck = ()=>localStorage.getItem('token') !=null && localStorage.getItem('token') !='null' 
    const getUserRule = ()=>localStorage.getItem('rule') 

    const logOut = e=> {
        localStorage.setItem('token',null)
        localStorage.setItem('rule',null)
        window.location.reload();
    }

    return (
        <div>
             {jwtCheck() ? 
                 <div className="account__profile">
                   <button onClick={logOut}>Logout</button>   
                  {getUserRule() =='admin' ? <Admin />: <Customer />}
                  </div>
             :props.register? <SignUp/>:<Login/>}
        </div>
    )
}

export default Account
