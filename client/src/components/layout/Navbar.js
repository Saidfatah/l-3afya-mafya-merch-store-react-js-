import React ,{useState,useContext}from 'react'
import {CartContext} from '../../Context/CartProvider'
import {jwtCheck,getUser} from "../Auth/Auth"
import { eventsService} from '../../rxjs/modalServce';
import {Link} from "react-router-dom";
/** @jsx jsx */
import { jsx, css} from '@emotion/core'

const  Navbar=(props)=> {
    const {cart} =useContext(CartContext)
    const [path, setpath] = useState("rtyrty")


    const slideInCart=e=> {
        eventsService.sendEvent('SLIDE_CART',true);
    }
    const slideInSideBar=e=> {
        eventsService.sendEvent('SLIDE_SIDEBAR',true);
    }
    const fadeInSearchModal=e=> {
        eventsService.sendEvent('FADEIN_SEARCH_MODAL',true);
    }

    const activeLink=(linkPath)=>{
        const windowHref=  window.location.href
        if(linkPath.indexOf(path)!=-1)return styles.activeLink
        return ""
    }
    
    return (
        <div css={styles.navBar} >
            <div css={styles.navBar__left}>
                <a  css={css`${styles.navBarLink};${styles.showOnMobile}`} 
                onClick={slideInSideBar}> 
                <i className="fas fa-bars"></i> 
                </a>
                 <Link 
                       css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/shop")}`} 
                      onClick={e=>setpath("/shop")} to="/shop">SHOP</Link>
                 <Link 
                       css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/collections")}`} 
                      onClick={e=>setpath("/collections")} to="/collections">COLLECTIONS</Link>
                 <Link 
                       css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/contact")}`} 
                      onClick={e=>setpath("/contact")} to="/contact">CONTACT</Link>
            </div>

            <div css={styles.navBar__middle}>
                <Link css={css`${styles.navBarLink};`} to="/">
                    <img css={styles.navBar__logo} src={'../../images/LOGO.png'}/>
                </Link>
            </div>

            <div css={styles.navBar__right}>
                <a  css={css`${styles.navBarLink};${styles.showOnMobile}`} 
                     onClick={slideInCart}> 
                    <i className="fas fa-shopping-bag"></i> 
                </a>
                <Link 
                     css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/account")}`} 
                     onClick={e=>setpath("/account")} to="/account">Account</Link>  
                <a css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} 
                  onClick={fadeInSearchModal}>
                   Search
                </a>        
              {
               jwtCheck() && JSON.parse(getUser()).rule =="admin"
               ?<React.Fragment>
                   <Link 
                         css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/product/create")}`}  
                         onClick={e=>setpath("/product/create")} to="/product/create">Add  Product</Link>
                   <Link 
                         css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo};${activeLink("/collectioncreation")}`}  
                         onClick={e=>setpath("/collectioncreation")} to="/collectioncreation" >Add  Collection</Link>
               </React.Fragment>
               :<React.Fragment> 
                    <a css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`}
                     onClick={slideInCart}>
                     Cart(<span>{cart.length}</span>) 
                    </a>
               </React.Fragment>
              }
            </div>
        </div>
    )
}


const styles ={
    navBarLink :css`
    font-size: 13px;
    color: #fff;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
    cursor: pointer;
    `,
    notLogo :css`
    line-height: 6em;
    height: 74px;
    :after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 10px;
        height: 3px;
        width: 0;
        z-index:-1;
        
        background-color: var(--colorPrimary);
        transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    :hover{
        :after{
            width: 90%;
        }
      }
    `,
    activeLink:css`
    :after{
        width: 90%;
    }
    `,
    hideOnMobile :css`
    @media all and (max-width :920px){display: none ;}
    `,
    showOnMobile :css`
    display: none ;
    @media all and (max-width :920px){display: inline ;}
    `,
    navBar :css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--colorBlack);
    padding: 0rem 2rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    position:sticky;
    width: 100%;
    `,
    navBar__left :css`
    flex: 1;
    display: flex;
    align-items: center;
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
    align-items: center;
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
