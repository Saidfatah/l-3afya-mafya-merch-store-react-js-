import React ,{forwardRef,useImperativeHandle,useContext}from 'react'
import {CartContext} from '../../Context/CartProvider'
import {jwtCheck,logOut} from "../Auth/Auth"
import {Link} from "react-router-dom";
/** @jsx jsx */
import { jsx, css, Global, ClassNames } from '@emotion/core'

const  Navbar=forwardRef((props,ref)=> {
    const {setSlideNow,setDisplaySearchModal}=props
    const {cart} =useContext(CartContext)
    useImperativeHandle(ref, () => ({ }));

    return (
        <div css={styles.navBar}>
            <div css={styles.navBar__left}>
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
            <div css={styles.navBar__middle}>
                <Link className="navBar__Link noHide  noborder" to="/">
                    <img css={styles.navBar__logo} src={'../../images/LOGO.png'}/>
                </Link>
            </div>
            <div css={styles.navBar__right}>
               <a className="navBar__Link sidemenu noHide" 
                 onClick={e=> {
                      document.body.style.overflowY="hidden" 
                      setSlideNow(true)
                      }}>
               <i className="fas fa-shopping-bag"></i></a>
               <Link className="navBar__Link no-sidemenu" to="/account">Account</Link>
               
             {jwtCheck()
               ?<React.Fragment>
                   <Link className="navBar__Link no-sidemenu" to="/product/create">Add  Product</Link>
                   <Link className="navBar__Link no-sidemenu" to="/collectioncreation" >Add  Collection</Link>
                   <Link className="navBar__Link no-sidemenu" to="/account" onClick={logOut}>Logout</Link>
               </React.Fragment>
               :<React.Fragment>
                    <a className="navBar__Link no-sidemenu" onClick={e=> {setDisplaySearchModal(true);document.body.style.overflowY="hidden"}}>
                       Search
                    </a>
                    <a className="navBar__Link no-sidemenu" onClick={e=> {setSlideNow(true);document.body.style.overflowY="hidden"}}>
                       Cart(<span>{cart.length}</span>)
                    </a>
               </React.Fragment>
             }
            </div>
        </div>
    )
})
const styles ={
    navBar :css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--colorBlack);
    padding: 0rem 2rem;
    position: fixed;
    margin-bottom:267px;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    `,
    navBar__left :css`
    flex: 1;
    `,
    navBar__middle :css`
    flex: 1;
    display: flex;
    justify-content: center;
    `,
    navBar__right :css`
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    `,
    navBar__Link :css`
    font-size: 13px;
    color: #fff;
    padding: 0 1rem;
    line-height: 1.6em;
    position: relative;
    z-index: 1;
    cursor: pointer;
    `,
    navBar__logo :css`
    width: 150px;
    `,
  }
export default Navbar
