import React ,{forwardRef,useImperativeHandle}from 'react'

import {Link} from "react-router-dom";
  
const  Navbar=forwardRef((props,ref)=> {
    //current linkl has underline
    //if the route doesn't belong to any link none will be underlined 
    useImperativeHandle(ref, () => ({ }));
    return (
       
        <div className="navBar">
            <div className="navBar__left">
                <a className="navBar__Link sidemenu noHide" onClick={e=> {ref.current.slideSideBarIn() }}><i className="fas fa-bars"></i></a>
                 <Link className="navBar__Link no-sidemenu" to="/shop">SHOP</Link>
                 <Link className="navBar__Link no-sidemenu" to="/collections">COLLECTIONS</Link>
                 <Link className="navBar__Link no-sidemenu" to="/contact">CONTACT</Link>
            </div>
            <div className="navBar__middle">
                <Link className="navBar__Link noHide  noborder" to="/">
                    <img className="navBar__logo" src={process.env.REACT_APP_PUBLIC_URL+'/images/LOGO.png' }/>
                </Link>
            </div>
            <div className="navBar__right">
               <a className="navBar__Link sidemenu noHide" onClick={e=> {ref.current.slideCartIn() }}><i className="fas fa-shopping-bag"></i></a>
               <Link className="navBar__Link no-sidemenu" to="/account">Account</Link>
               <a className="navBar__Link no-sidemenu" onClick={e=> {ref.current.fadeIn() }}>Search</a>
               <a className="navBar__Link no-sidemenu" onClick={e=> {ref.current.slideCartIn() }}>Cart(<span>1</span>)</a>
            </div>
        </div>
    )
})

export default Navbar
