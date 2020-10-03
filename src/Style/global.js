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
