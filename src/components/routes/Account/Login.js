import React,{useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const [redirect,setRedirect]=useState(false)
    const login = e=>{
        e.preventDefault()
         if(email !== '' && password !==''){
            axios.post('http://localhost:4000/users/login',{email,password})
                 .then(res=>{
                     localStorage.setItem('token',res.data.token)
                     localStorage.setItem('rule',res.data.rule)
                     window.location.reload();
                })
                 .catch(err=> setErr('worng email or password'))
         }
         else
         {
            setErr('please enter email and password')
         }
    }
    return (
        <div>
            <h1>Login</h1>
            <p>Please enter your e-mail and password:</p>
             <div className="error">{err}</div>
             <input type="email" name="email" placeholder="Email" onClick={e=>setErr('')} onChange={e=>setEmail(e.target.value)}/>
             <input type="password" name="password" placeholder="Password" onClick={e=>setErr('')} onChange={e=>setPassword(e.target.value)}/>
             <button onClick={login} className="btn">LOGIN</button>
             Don't have an account? <Link to="/contact/register">Create one</Link>
         
        </div>
    )
}

export default Login
