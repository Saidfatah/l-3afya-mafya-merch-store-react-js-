import React from 'react'
import {Link} from "react-router-dom";



function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__blocks">
                      <div className="footer__block">
                        <h2>CONNECT</h2>
                         <div className="social">
                           <a href="https://twitter.com/home"><i class="fab fa-twitter"></i></a>
                           <a href="https://www.facebook.com/"><i class="fab fa-facebook-f"></i></a>
                           <a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
                           <a href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a>
                         </div>
                      </div>
                      <div className="footer__block">
                        <h2>MENU</h2>
                        <div className="footer__links">
                            <Link className="footer__Link" to="/contact">CUSTOMER SERVICE</Link>
                            <Link className="footer__Link" to="/policy">PRIVACY POLICY</Link>
                            <Link className="footer__Link" to="/search">SEARCH</Link>
                        </div>
                      </div>
                      <div className="footer__block">
                        <h2>Newsletter</h2>
                         <div className="newsletter">
                             {/* <p>You have been subscribed to our newsletter.</p> */}
                             <form>
                             <input />
                             <button className="btn" type="submit">SUBSCRIBE</button>
                            </form>
                         </div>
                       
                      </div>
                    </div>
                    <div className="footer__credits">
                        <p>© l'3afya Mafya</p>
                        <p>designed by said fatah</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer