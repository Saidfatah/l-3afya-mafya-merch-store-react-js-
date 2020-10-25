import React,{useState,useRef} from 'react'
import {Button,Container,H1,LightParagraph,FlexCol,Input,Err,UnderlinedLink, FlexRow} from '../../../../Style/global'
import ReCAPTCHA from "react-google-recaptcha"

/** @jsx jsx */
import { jsx ,css} from '@emotion/core'
import axios from 'axios'
const SignUp=({url})=> {
    const [userInfo, setuserInfo] = useState({
        password:'',
        email:'',
        firstname:'',
        lastname:''
    })
    const [errs,setErr]=useState({
         passwordReq:false ,
         emailReq:false,
         firstnameReq:false,
         lastnameReq:false,
         ROBOT:false,
         REGISTER:false,
         emailUsed:false,

    })
    const [registerSucces, setregisterSucces] = useState(false)
    const [canSubmit, setcanSubmit] = useState(true)
    const reRef= useRef()
    const apiurl=process.env.API_URL




    const resetValidaton = e =>{
        if(e.target.tagName.toLowerCase()=='input') setErr({
            passwordReq:false ,
            emailReq:false,
            firstnameReq:false,
            lastnameReq:false,
            emailUsed:false,
            ROBOT:false,
            REGISTER:false
       })
    }
    const validate=()=>{
        const {firstname,lastname,email,password}=userInfo
        const errsObjTemp ={...errs}

        let errsCount = 0 ; 
        if(firstname== ''){
             errsObjTemp.firstnameReq=true
             errsCount++
        }
        if(lastname== ''){
             errsObjTemp.lastnameReq=true
             errsCount++
        }
        if(email== ''){
             errsObjTemp.emailReq=true
             errsCount++
        }
        if(password== ''){
             errsObjTemp.passwordReq=true
             errsCount++
        }
 
        setErr({...errsObjTemp})
        return errsCount>0 ? false :true
    }


    const register=async (e)=>{
         e.preventDefault()
         if(!validate()) return ; 
         setcanSubmit(false)
         try {
            if(reRef.current == undefined) return ;
            const tokenRespose =await  reRef.current.executeAsync()
            const token = tokenRespose
            reRef.current.reset()
          
            const regsterUserPromise= await axios.post(apiurl+'/users/register',{...userInfo,token:token})
            if(regsterUserPromise.data.user == undefined) throw new Error('REGISTER') ; 
            setregisterSucces(true)
            setcanSubmit(true)
            
            localStorage.setItem('token',regsterUserPromise.data.token)
            localStorage.setItem('rule',regsterUserPromise.data.rule)
            localStorage.setItem('user',JSON.stringify(regsterUserPromise.data.user))
            window.location.reload();
        
         } catch (error) {
            if(error.response.statusText == "EMAIL" )
            { 
                 setErr({emailUsed:true})
            }
            if(error.response.statusText == "REGISTER" )
            { 
                 setErr({REGISTER:true})
            }
            if(error.response.statusText == "ROBOT" )
            { 
                 setErr({ROBOT:true})
            }
         }
    }
    const ErrValidator = ({triiger,message})=>{
        if(!triiger)return null;
        return <Err>{message}</Err>
    }
    const handleChange=(field)=>(e)=>setuserInfo({...userInfo,[field]:e.target.value})
    
   if(registerSucces)
   return <Container>
   <div css={css`
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
            justify-content: center;
       `}> 
        <i className="fas fa-check-circle" css={css`font-size:3rem; color:green;margin-right:1rem;`}></i>
        <p css={css`color:green`} > registerd with succes </p>
   </div> 
   </Container>

    return (
        <Container verticalCenter>
            <FlexCol width="600px">
                 <ReCAPTCHA  
                 sitekey="6Leex9QZAAAAAJnjaE1JuH-L6owOoGarmEd9qHTz" 
                 ref={reRef}  
                 size="invisible" 
                 /> 
                 <H1>Register</H1>
                 <LightParagraph center mgb={1} mgt={2}>Please fill in the information below:</LightParagraph>
                 <ErrValidator triiger={errs.ROBOT} message="robot detcted" />
                 <ErrValidator triiger={errs.REGISTER} message="server error try again later " />
                 <form  onSubmit={register} onClick={resetValidaton} css={css`width:100%`} >
                 <FlexCol mgb={2} >
                     <ErrValidator triiger={errs.firstnameReq} message="First name is required" />
                     <Input 
                      type="text" 
                      name="firstname"
                      placeholder="First Name" 
                      onChange={handleChange('firstname')} 
                      value={userInfo.firstname}/>

                     <ErrValidator triiger={errs.lastnameReq} message="Last name is required" />
                     <Input 
                      type="text" 
                      name="lastname"
                      placeholder="Last Name" 
                      onChange={handleChange('lastname')} 
                      value={userInfo.lastname}
                      />

                     <ErrValidator triiger={errs.emailReq} message="Email is required" />
                     <ErrValidator triiger={errs.emailUsed} message="Email is already used " />
                     <Input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      onChange={handleChange('email')} 
                      value={userInfo.email}
                     />
                     

                     <ErrValidator triiger={errs.passwordReq} message="Password is required " />
                     <Input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      onChange={handleChange('password')} 
                      value={userInfo.password}
                     />

                     <Button type='submit' disabled={!canSubmit} width='100%' >CREATE MY ACCOUNT</Button>
                 </FlexCol>
                 </form>
                 <FlexRow center>  
                 <div>
                     <span>got an account ? </span>
                     <UnderlinedLink to={`login`} size={1}>Create one</UnderlinedLink>
                 </div>
                 </FlexRow>
            </FlexCol>
        </Container>
    )
}

export default SignUp
