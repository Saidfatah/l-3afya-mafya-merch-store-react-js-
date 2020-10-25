import React ,{createRef,forwardRef,useEffect}from 'react'
import {Link} from "react-router-dom"
import SocialLinks from './Social'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Modal,ModalBackground} from '../../Style/global'
import {eventsService} from '../../rxjs/modalServce'

const SideBar=(props) =>{
    const sideBarContainer = createRef()
    const pageShdowCover = createRef()
 
 
  
    const slideIn=()=>{
        if(  pageShdowCover.current ==null  ||  sideBarContainer.current == null ) return ; 
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
    const slideOutOut=e=>{
        eventsService.clearEventNotification();
        document.body.style.overflowY="scroll" 
        sideBarContainer.current.style.left='-400px'
        pageShdowCover.current.style.opacity='0'
        setTimeout(()=>pageShdowCover.current.style.display='none', 600);
    }

    useEffect(() => {
        let subscription = eventsService.getEventNotification().subscribe((eventNotification) => 
        {
            if(eventNotification && eventNotification.title=='SLIDE_SIDEBAR')
            {
                document.body.style.overflowY="hidden"
                slideIn()
            }
        });
      
        return ()=>{ subscription.unsubscribe()}
    }, [])
    return (
        <div>
            <ModalBackground  ref={pageShdowCover} onClick={slideOutOut} />
            <Modal  ref={sideBarContainer} left={-400}>
                <div css={styles.sideBar__body} >
                    <i className="far fa-times-circle Close" onClick={slideOutOut}></i>
                    <div className="sideBar__links">
                         <Link className="sideBar__Link" to="/shop"  onClick={slideOutOut}>SHOP</Link>
                         <Link className="sideBar__Link" to="/collections"  onClick={slideOutOut}>COLLECTIONS</Link>
                         <Link className="sideBar__Link" to="/contact"  onClick={slideOutOut}>CONTACT</Link>
                         <Link className="sideBar__Link " to="/account"  onClick={slideOutOut}>Account</Link>
                         <Link className="sideBar__Link " to="/search"  onClick={slideOutOut}>Search</Link>
                    </div>
                </div>
                <div css={styles.sideBar__bottom}>  
                    <SocialLinks />
                </div>
            </Modal>
        </div>
    )
}

const styles ={
    sideBar__body :css`
    height: calc(100vh - 48px);
    padding:0 2rem;
    padding-top:1rem;
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
