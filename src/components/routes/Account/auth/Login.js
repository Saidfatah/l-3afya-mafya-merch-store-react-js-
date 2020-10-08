import React,{useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import {Button,Container,H1,LightParagraph,FlexCol,faintLink,Input} from '../../../../Style/global'
/** @jsx jsx */
import { jsx ,css} from '@emotion/core'

const Login=({url})=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')

    const login = async e=>{
        e.preventDefault()
         if(email !== '' && password !==''){
                 try {
                    const loginPromise = await axios.post('http://localhost:4000/users/login',{email,password})
                    if(loginPromise.data.user == undefined) throw new Error('no user found ') ; 
               
                     console.log(loginPromise.data)
                     if(loginPromise.data.user == undefined) throw new Error('no user found ') ; 
                     
                     localStorage.setItem('token',loginPromise.data.token)
                     localStorage.setItem('rule',loginPromise.data.rule)
                     localStorage.setItem('user',JSON.stringify(loginPromise.data.user))
                     window.location.reload();
              
                 } catch (error) {
                    setErr('worng email or password')
                    console.log(error)
                 }
         }
         else
         {
            setErr('please enter email and password')
         }
    }

    return (
         <Container verticalCenter>
                <div css={css`
                width:500px;
                display:flex;
                align-items:center;
                flex-direction:column;
                `}>
                     <H1>Login</H1>
                     <LightParagraph center mgb={1} mgt={2}>Please enter your e-mail and password:</LightParagraph>
                     <p></p>
                     <div className="error">{err}</div>
                     <FlexCol mgb={2} >
                          <Input 
                               type="email"
                               name="email" 
                               placeholder="Email" 
                               onClick={e=>setErr('')} 
                               onChange={e=>setEmail(e.target.value)}
                          />
                          <Input 
                               type="password" 
                               name="password"
                               placeholder="Password" 
                               onClick={e=>setErr('')}
                               onChange={e=>setPassword(e.target.value)}
                          />
                          <Button onClick={login} width="100%">LOGIN</Button>
                     </FlexCol>
                     <div>
                          <span> Don't have an account?</span>
                          <Link to={`/account/register`} css={faintLink}>Create one</Link>
                     </div>
                </div>
         </Container>
    )
}

export default Login
