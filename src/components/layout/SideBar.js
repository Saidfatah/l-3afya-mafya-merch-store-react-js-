import React ,{createRef,forwardRef,useImperativeHandle}from 'react'
import {Link} from "react-router-dom"
import PageCover from './PageCover'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SideBar=forwardRef((props,ref) =>{
    const sideBarContainer = createRef()
    const pageShdowCover = createRef()
    
    const slideOut=e=>{
        sideBarContainer.current.style.left='-400px'
        pageShdowCover.current.style.opacity='0'
        setTimeout(()=>pageShdowCover.current.style.display='none', 600);
    }

    useImperativeHandle(ref, () => ({
        slideIn(){
            pageShdowCover.current.style.display='block'
            pageShdowCover.current.style.top=window.scrollY +'px'
            pageShdowCover.current.style.transition="none"
            sideBarContainer.current.style.transition="none"
            sideBarContainer.current.style.top=window.scrollY +'px'
            setTimeout(() => {
                sideBarContainer.current.style.transition="all .2s ease-in"
                pageShdowCover.current.style.transition="all .2s ease-in"
                pageShdowCover.current.style.opacity='1'
                sideBarContainer.current.style.left='0'
            }, 400);
        }
    }));

    const slideOutOut=e=>{
        slideOut(); document.body.style.overflowY="scroll" 
    }

    return (
        <div>
            <PageCover {...{pageShdowCover,slideOutOut}} />
            <div css={styles.sideBar} ref={sideBarContainer}>
                <div css={styles.sideBar__body} >
                    <i className="far fa-times-circle Close" onClick={slideOutOut}></i>
                    <div className="sideBar__links">
                         <Link className="sideBar__Link" to="/shop"  onClick={slideOutOut}>SHOP</Link>
                         <Link className="sideBar__Link" to="/collections"  onClick={slideOutOut}>COLLECTIONS</Link>
                         <Link className="sideBar__Link" to="/contact"  onClick={slideOutOut}>CONTACT</Link>
                         <Link className="sideBar__Link faintLink noBorder" to="/account"  onClick={slideOutOut}>Account</Link>
                         <a className="sideBar__Link faintLink noBorder"  onClick={slideOutOut}>Search</a>
                    </div>
                </div>
                <div css={styles.sideBar__bottom}>  
                    <div css={styles.social} >
                           <a href="https://twitter.com/home"  onClick={slideOutOut}><i className="fab fa-twitter"></i></a>
                           <a href="https://www.facebook.com/"  onClick={slideOutOut}><i className="fab fa-facebook-f"></i></a>
                           <a href="https://www.instagram.com/"  onClick={slideOutOut}><i className="fab fa-instagram"></i></a>
                           <a href="https://www.youtube.com/"  onClick={slideOutOut}><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
        </div>
        </div>
    )
})

const styles ={
    sideBar :css`width: 400px;
    height: 100vh;
    background-color: #fff;
    position: absolute;
    box-shadow: 0px 0px 6px 5px var(--colorShadow);
    transition: all .2s ease-in;
    z-index: 999;
    top: 0;
    display: flex;
    left: -400px;
    flex-direction: column; 
    `,
    sideBar__body :css`height: calc(100vh - 48px);
    padding:0 2rem;
    `,
    sideBar__bottom:css`height: 48px;
    padding: 0 2rem;
    border-top: 1px solid var(--colorGreyFaint);
    display: flex;
    align-items: center;`,
    social:css`display: flex;
    justify-content: space-between;
    width: 100%;
    i{
        color: var(--colorGreyLight);
     }
    `

}
export default SideBar
