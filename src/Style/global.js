/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

export const raw_link = css`
    font-size: .8rem;
    color:var(--colorBlack)
`
export const iconeB = css`
    font-size: 1rem;
    margin-right: .25rem;
`
export const faintLink = css`
    color:var(--colorGreyLight);
    transition: all .3s ease-out;
    cursor: pointer;
    a:hover{
        color: rgba(92,92,92,0.5);
    }
`
export const link_underlined = css`
    cursor: pointer;
    border: none;
    padding: 0;
    font-size: .6rem;
    color:var(--colorGrey);
    $:before{
        cursor: pointer;
        top: 100%;
        height: 2px;
}
`
export const Button =styled.button(props=>{
   return`
    padding: .75rem 2rem ;
    color: #fff;
    background-color: transparent;
    border: 1px solid #000;
    position: relative;
    z-index: 1;
    transition: all .5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    cursor: pointer;
    width: ${props.width ? props.width:'fit-content'};
    margin-top:  ${props.marginTop ? props.marginTop :0}rem;
    ${
        props.collection
        ?`color:var(--colorGrey);
        border-color: #fff;`
        :''
    }
    &:before{
         content: '';
         position: absolute;
         z-index: -1;
         height: 100%;
         width: 100%;
         top: 0;
         left: 0;
         ${props.collection?"background-color: #fff;":"background-color: var(--colorGrey);"}
         transition: all .5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
         transform-origin: left center;
         //I want to change style on hover 
    }
    
    &:hover{
        ${
            props.collection
            ?"color:#fff;"
            :"color:var(--colorGrey);"
        }
    }
`})
export const H1 =styled.h1(props=>{
   return`
    margin-bottom:${props.mgb?props.mgb:0}rem ;
    margin-top:${props.mgt?props.mgt:0}rem ;
    text-align: center;
    font-size: 22px; 
`})
export const HM =styled.h1(props=>{
   return`
   color: var(--colorGreyDark);
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
   font-size: 1.1rem;
   line-height: 1.3em;
`})
export const Grid =styled.div(props=>{
   return`
    display:flex;
    flex-direction:"row"   ;
    justify-content:"space-between" ;
    width:100%;
    
    align-Items="center";
    ${
        props.cp
        ?`
        width: 300px !important;
        margin: 0 auto;
        margin-bottom: 2rem !important;`
        :''
    }
`})
export const Card =styled.div(props=>{
   return`
    border:1px solid black ; 
    padding:1rem;
    border-radius:8px;
    margin-bottom:1rem;
`})
export const RawLink =styled.a(props=>{
   return`
   font-size: .8rem;
   color:var(--colorBlack)
`})
export const FlexCol =styled.div(props=>{
   return`
     width:100%;
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     margin-left:${props.mgl?props.mgl:'0'}rem;
     margin-bottom:${props.mgb?props.mgb:'0'}rem;
     margin-top:${props.mgt?props.mgt:'0'}rem;
     >*{
         width:100%
     }
   `
})
export const FlexWrap =styled.div(props=>{
   return`
     width:100%;
     display:flex;
     flex-wrap:wrap;
     margin-left:${props.mgl?props.mgl:'0'}rem;
     margin-bottom:${props.mgb?props.mgb:'0'}rem;
     margin-top:${props.mgt?props.mgt:'0'}rem;
   `
})
export const FlexRow =styled.div(props=>{
   return`
     width:100%;
     display:flex;
     margin-bottom:${props.mgb?props.mgb:'0'}rem;
     margin-top:${props.mgt?props.mgt:'0'}rem;
     >*{
         width:100%
     }
   `
})
export const FlexItem =styled.div(props=>{
   return`
     flex:${props.flex};
     margin:1rem;
   `
})
export const Container =styled.div(props=>{
   return`
   width:100%;
   ${!props.nomargin 
    ? "margin: 1rem auto;"
    :  "" 
    }
   height:calc(100vh - 74px);
   padding:1rem;
   ${props.verticalCenter
    ?`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    `
    :' '
    }
`})
export const Input =styled.input(props=>{
   return`
      border:1px solid var(--colorGreyFaint);
      color:var(--colorGreyLight);
      transition:all .3s ease-in ; 
      font-size:.9rem;
       :focus{
           outline:none;
           border:1px solid var(--colorGreyLight);
      }
       ::placeholder{
        color:var(--colorBlack);
      }
`})
export const Modal=styled.div(props=>{
   return `
   background-color: #fff;
   position: absolute;
   box-shadow: 0px 0px 6px 5px var(--colorShadow);
   transition: all .2s ease-in;
   z-index: 999;
   flex-direction:column; 
   width:${props.width?props.width :'400px'} ;
   height: ${props.height?props.height : '100vh'};
   top: ${props.top?props.top:0}px;;
   ${
      props.left
      ?"left:"+(props.left||-400)+"px"
      :""
   }
   ${
      props.right
      ?"right:"+(props.right||0)+"px"
      :""
   }
   display: ${ props.display?props.display:"flex"};
   opacity:${ props.opacity?props.opacity:1};
   overflow-y: ${ props.overflowY};
   `
})
export const ModalBackground=styled.div(props=>{
   return `
   display: none;
   width:100%;
   height: 100vh;
   background-color: var(--colorShadowDarker);
   position: absolute;
   right: 0;
   top: 0;
   z-index: 90;
   transition: all .4s ease-in;
   `
})
export const BlackTitle =styled.h2(props=>{
   return`
   color:var(--colorBlack);
   font-size:1.2rem;
   font-weight : bold;
   margin-bottom:1rem;
`})
export const LightTitle =styled.h2(props=>{
   return`
   font-family: "Century Gothic",sans-serif;
   color:var(--colorGrey);
   font-size:.9rem;
   font-weight : bold;
   margin-bottom:1.5rem;
`})
export const LightParagraph =styled.p(props=>{
   return`
   color:var(--colorGreyLight);
   font-size:.8rem;
   line-height:1.65;
   width:100%;
   margin-bottom:${props.mgb?props.mgb:1.5}rem;
   margin-top:${props.mgt?props.mgt:0}rem;
   text-align:${props.center ? 'center':''}
`})
export const BlackHighlight =styled.p(props=>{
   return`
   color:var(--colorBlack);
   font-size:20px;
   font-family: "Century Gothic",sans-serif;
   font-weight: 400;
   letter-spacing:10px;
   font-style: normal;
   text-transform: uppercase;
   margin-bottom:2rem;
`})
export const SmallText =styled.p(props=>{
   return`
   color:var(--colorBlack);
   font-size:.7rem;
   margin-bottom:.5rem;
`})
export const Err =styled.p(props=>{
   return`
   color:#fff;
   padding:.25rem;
   font-size:.7rem;
   border-radius:12px;
   text-align:center;
   margin-bottom:.5rem;
   background:var(--colorPrimary);
`})
export const Border =styled.p(props=>{
   return`
   height:1px;
   margin-bottom:1rem;
   width:100%;
   background:var(--colorGreyLight);
`})


export const LightList =styled.ul(props=>{
   return`
   color:var(--colorBlack);
   color:var(--colorGreyLight);
   padding:.5rem 2rem;
   li{
    font-size:.8rem;
    margin-bottom:1rem;
    color:var(--colorGreyLight);
   }
`})

