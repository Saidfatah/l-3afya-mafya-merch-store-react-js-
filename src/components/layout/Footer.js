import React from 'react'
import {Link} from "react-router-dom";
/** @jsx jsx */
import { jsx, css, Global, ClassNames } from '@emotion/core'
import {Button} from '../../Style/global'

const  Footer=() =>{
  if(window.location.href.indexOf("/checkout") != -1)return null
    return (
        <div css={styles.footer}>
            <div className="container">
                <div css={styles.footer__inner}>
                    <div css={styles.footer__blocks}>
                      <div css={styles.footer__block}>
                        <h2>CONNECT</h2>
                         <div css={styles.social}>
                           <a href="https://twitter.com/home"><i className="fab fa-twitter"></i></a>
                           <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                           <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                           <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                         </div>
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
                             <input />
                             <Button type="submit" > SUBSCRIBE </Button>
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
    margin-bottom: 1.5REM;
}
`,
  footer__inner :css`padding: 5rem 0;
  display: flex;
  flex-direction: column;
  `,
  footer__blocks :css` display: flex;
  height: 300px;`,
  footer__block :css`flex: 1;`,
  social :css` height:40px;
  width: 98px;
  margin-right: 2rem;`,
  footer__credits :css`cursor: pointer;
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
  social :css` width: 150px;`,
  newsletter :css`form{
    display: flex;
    flex-direction: column;
}`,

}

export default Footer
