import React ,{forwardRef,useImperativeHandle,useContext}from 'react'
import {CartContext} from '../../Context/CartProvider'
import {jwtCheck,logOut} from "../Auth/Auth"

import {Link} from "react-router-dom";
  
const  Navbar=forwardRef((props,ref)=> {
    const {setSlideNow}=props
    const {cart} =useContext(CartContext)
    useImperativeHandle(ref, () => ({ }));
    console.log('navbar')

    return (
        <div className="navBar">
            <div className="navBar__left">
                <a className="navBar__Link sidemenu noHide" 
                  onClick={e=> {
                      document.body.style.overflowY="hidden" 
                      ref.current.slideSideBarIn() 
                      }}>
                 <i className="fas fa-bars"></i></a>
                 <Link className="navBar__Link no-sidemenu" to="/shop">SHOP</Link>
                 <Link className="navBar__Link no-sidemenu" to="/collections">COLLECTIONS</Link>
                 <Link className="navBar__Link no-sidemenu" to="/contact">CONTACT</Link>
            </div>
            <div className="navBar__middle">
                <Link className="navBar__Link noHide  noborder" to="/">
                    <img className="navBar__logo" src={'/images/LOGO.png' }/>
                </Link>
            </div>
            <div className="navBar__right">
               <a className="navBar__Link sidemenu noHide" 
                 onClick={e=> {
                      document.body.style.overflowY="hidden" 
                      setSlideNow(true)
                      }}>
               <i className="fas fa-shopping-bag"></i></a>
               <Link className="navBar__Link no-sidemenu" to="/account">Account</Link>
               
               
             {jwtCheck()?
               <React.Fragment>
                   <Link className="navBar__Link no-sidemenu" to="/product/create">Add New Product</Link>
                   <Link className="navBar__Link no-sidemenu" to="/account">Logout</Link>
               </React.Fragment>:
               <React.Fragment>
                   <a className="navBar__Link no-sidemenu" onClick={e=> {ref.current.fadeIn() }}>Search</a>
                   <a className="navBar__Link no-sidemenu" onClick={e=> {setSlideNow(true);document.body.style.overflowY="hidden"}}>Cart(<span className="cart__count">{cart.length}</span>)</a>
               </React.Fragment>
             }
            </div>
        </div>
    )
})

export default Navbar
