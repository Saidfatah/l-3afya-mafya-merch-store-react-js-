import React,{useState} from 'react'
import axios from 'axios'
import Error from '../../../layout/Error'
import {Button,Container,H1,LightParagraph,FlexCol,Input,UnderlinedLink} from '../../../../Style/global'
/** @jsx jsx */
import { jsx ,css} from '@emotion/core'

const Login=({url})=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const apiurl=process.env.API_URL

    const login = async e=>{
        e.preventDefault()
         if(email !== '' && password !==''){
                 try {
                    const loginPromise = await axios.post(apiurl+'/users/login',{email,password})
                    if(loginPromise.data.user == undefined) throw new Error('no user found ') ; 
               
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
                <FlexCol width="500px" css={css`@media all and (max-width :920px){width: 100%;padding: 1rem; }`}>
                     <H1>Login</H1>
                     <LightParagraph center mgb={1} mgt={2}>Please enter your e-mail and password:</LightParagraph>
                     <p></p>
                     <Error trigger={err!=''} msg={err} />
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
                          <UnderlinedLink to={`/account/register`} size={1}>Create one</UnderlinedLink>
                     </div>
                </FlexCol>
         </Container>
    )
}

export default Login
