import React ,{createRef,forwardRef,useImperativeHandle}from 'react'
import {Link} from "react-router-dom"

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
            sideBarContainer.current.style.left='0'
            pageShdowCover.current.style.opacity='1'
        }
    }));
    return (
        <div>
            <div className="pageShdowCover" ref={pageShdowCover}></div>
            <div className="SideContainer sideBar" ref={sideBarContainer}>
                <div className="sideBar__body">
                    <i className="far fa-times-circle Close" onClick={slideOut}></i>
                    <div className="sideBar__links">
                         <Link className="sideBar__Link" to="/shop">SHOP</Link>
                         <Link className="sideBar__Link" to="/collections">COLLECTIONS</Link>
                         <Link className="sideBar__Link" to="/contact">CONTACT</Link>
                         <Link className="sideBar__Link faintLink noBorder" to="/account">Account</Link>
                         <a className="sideBar__Link faintLink noBorder">Search</a>
                    </div>
                </div>
                <div className="sideBar__bottom">  
                    <div className="social">
                           <a href="https://twitter.com/home"><i className="fab fa-twitter"></i></a>
                           <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                           <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                           <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
        </div>
        </div>
    )
})

export default SideBar
