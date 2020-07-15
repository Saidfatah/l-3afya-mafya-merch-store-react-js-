import React from 'react'
import logo from "../../Images/LOGO.png"

import {Link} from "react-router-dom";
  
function Navbar(props) {
    return (
        <div className="navBar container">
             
             <div className="navBar__left">
                 <Link className="navBar__Link" to="/shop">SHOP</Link>
                 <Link className="navBar__Link" to="/collections">COLLECTIONS</Link>
                 <Link className="navBar__Link" to="/contact">CONTACT</Link>
            </div>
            <div className="navBar__middle">
                <Link className="navBar__Link" to="/">
                    <img  src={logo}/>
                </Link>
            </div>
            <div className="navBar__right">
               <Link className="navBar__Link" to="/account">Account</Link>
               <a className="navBar__Link">Search</a>
               <a className="navBar__Link">Cart(<span>1</span>)</a>
            </div>
            
           
        </div>
    )
}

export default Navbar
