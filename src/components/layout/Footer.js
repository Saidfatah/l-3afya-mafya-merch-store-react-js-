import React from 'react'
import {Link} from "react-router-dom";
/** @jsx jsx */
import { jsx, css} from '@emotion/core'
import {Button,Input} from '../../Style/global'
import SocialLinks from './Social'
const  Footer=() =>{
  if(window.location.href.indexOf("/checkout") != -1)return null
    return (
        <div css={styles.footer}>
            <div className="container">
                <div css={styles.footer__inner}>
                    <div css={styles.footer__blocks}>
                      <div css={styles.footer__block}>
                        <h2>CONNECT</h2>
                        <SocialLinks width="150px" color="#fff" />
                      </div>
                      <div css={styles.footer__block}>
                        <h2>MENU</h2>
                        <div css={styles.footer__Links}>
                            <Link css={styles.footer__Link} to="/contact">CUSTOMER SERVICE</Link>
                            <Link css={styles.footer__Link} to="/policy">PRIVACY POLICY</Link>
                            <Link css={styles.footer__Link} to="/search">SEARCH</Link>
                        </div>
                      </div>
                      <div css={styles.footer__block}>
                        <h2>Newsletter</h2>
                         <div css={styles.newsletter}>
                             {/* <p>You have been subscribed to our newsletter.</p> */}
                             <form>
                             <Input />
                             <Button type="submit" width="100%" > SUBSCRIBE </Button>
                            </form>
                         </div>
                       
                      </div>
                    </div>
                    <div css={styles.footer__credits}>
                        <p>© l'3afya Mafya</p>
                        <p>designed by said fatah</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles ={
  footer :css`background-color: var(--colorBlack);
  color: #fff;
  height: fit-content;
  h2{
    font-family: "Century Gothic",sans-serif;
    font-weight: 400;
    font-size: 13px;
    font-style: normal;
    margin-bottom: 1rem;
}
`,
  footer__inner :css`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  `,
  footer__blocks :css` 
  display: flex;
  min-height: 300px;
  @media all and (max-width :920px){
    flex-direction: column;
  }
  `,
  footer__block :css`
  flex: 1;
  margin-bottom:1.5rem;
  `,
  social :css` 
  width:100%;
  margin-right: 2rem;
  `,
  footer__credits :css`
  cursor: pointer;
  font-size: 1.25rem;
  first-of-type[p]{
    font-size: 11px;
  }
  p:last-child{
    font-size: 14px;
  }
  `,
  footer__Link :css` color: #fff;
  font-size: 14px;
  margin-bottom: .75rem;`,
  footer__Links :css`display: flex;
  flex-direction: column;`,
  social :css` 
  width:100%;
  display:flex;
  `,
  newsletter :css`form{
    display: flex;
    flex-direction: column;
}`,

}

export default Footer
