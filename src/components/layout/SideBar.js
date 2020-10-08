import React ,{createRef,forwardRef,useImperativeHandle}from 'react'
import {Link} from "react-router-dom"
import SocialLinks from './Social'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Modal,ModalBackground} from '../../Style/global'


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
        slideOut(); 
        document.body.style.overflowY="scroll" 
    }

    return (
        <div>
            <ModalBackground  ref={pageShdowCover} onClick={slideOutOut} />
            <Modal  ref={sideBarContainer}>
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
                    <SocialLinks />
                </div>
            </Modal>
        </div>
    )
})

const styles ={
    sideBar__body :css`
    height: calc(100vh - 48px);
    padding:0 2rem;
    `,
    sideBar__bottom:css`
    height: 48px;
    padding: 0 2rem;
    border-top: 1px solid var(--colorGreyFaint);
    display: flex;
    align-items: center;
    `
}
export default SideBar
