import React ,{forwardRef,useImperativeHandle,useContext}from 'react'
import {CartContext} from '../../Context/CartProvider'
import {jwtCheck,getUser} from "../Auth/Auth"
import {Link} from "react-router-dom";
/** @jsx jsx */
import { jsx, css} from '@emotion/core'

const  Navbar=forwardRef((props,ref)=> {
    const {setSlideNow,setDisplaySearchModal}=props
    const {cart} =useContext(CartContext)
    useImperativeHandle(ref, () => ({ }));

    return (
        <div css={styles.navBar}>
            <div css={styles.navBar__left}>
                <a  css={css`${styles.navBarLink};${styles.showOnMobile}`} onClick={e=>{document.body.style.overflowY="hidden" ; ref.current.slideSideBarIn() }}> <i className="fas fa-bars"></i> </a>
                 <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/shop">SHOP</Link>
                 <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/collections">COLLECTIONS</Link>
                 <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/contact">CONTACT</Link>
            </div>

            <div css={styles.navBar__middle}>
                <Link css={css`${styles.navBarLink};`} to="/">
                    <img css={styles.navBar__logo} src={'../../images/LOGO.png'}/>
                </Link>
            </div>

            <div css={styles.navBar__right}>
                <a  css={css`${styles.navBarLink};${styles.showOnMobile}`} onClick={e=> {document.body.style.overflowY="hidden";setSlideNow(true)}}> <i className="fas fa-shopping-bag"></i> </a>
               <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/account">Account</Link>  
               <a css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} onClick={e=>{setDisplaySearchModal(true);document.body.style.overflowY="hidden"}}>Search</a>        
              {
               jwtCheck() && JSON.parse(getUser()).rule =="admin"
               ?<React.Fragment>
                   <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/product/create">Add  Product</Link>
                   <Link css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} to="/collectioncreation" >Add  Collection</Link>
               </React.Fragment>
               :<React.Fragment> 
                    <a css={css`${styles.navBarLink};${styles.hideOnMobile};${styles.notLogo}`} onClick={e=> {setSlideNow(true);document.body.style.overflowY="hidden"}}>Cart(<span>{cart.length}</span>) </a>
               </React.Fragment>
              }
            </div>
        </div>
    )
})


const styles ={
    navBarLink :css`
    font-size: 13px;
    color: #fff;
    padding: 0 1rem;
    line-height: 1.6em;
    position: relative;
    z-index: 1;
    cursor: pointer;
    `,
    notLogo :css`
    :after{
        content: '';
        position: absolute;
        top: 50%;
        left: 10px;
        height: 15px;
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
