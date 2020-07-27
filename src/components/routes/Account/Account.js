import React from 'react'
import Login from './Login'
import Customer from './Customer'
import Admin from './Admin'
import SignUp from './SignUp'
function Account(props) {
    const jwtCheck = ()=>localStorage.getItem('token') !=null && localStorage.getItem('token') !='null' 
    const getUserRule = ()=>localStorage.getItem('rule') 
    const getUser = ()=>JSON.parse(localStorage.getItem('user') )

    const logOut = e=> {
        localStorage.setItem('token',null)
        localStorage.setItem('rule',null)
        window.location.reload();
    }

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
