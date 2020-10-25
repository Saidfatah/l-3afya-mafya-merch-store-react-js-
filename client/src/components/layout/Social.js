import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Social=({slideOutOut,width,color})=> {
    return (
      <div css={css`${styles.social}; 
         width:${width?width:"100%"};
         i{
             color:${color?color:" var(--colorGreyLight)"};
         }`}
      >
           <a href="https://twitter.com/home"  onClick={slideOutOut||null}>
                <i className="fab fa-twitter"></i>
           </a>
           <a href="https://www.facebook.com/"  onClick={slideOutOut||null}>
                <i className="fab fa-facebook-f"></i>
           </a>
           <a href="https://www.instagram.com/"  onClick={slideOutOut||null}>
                <i className="fab fa-instagram"></i>
           </a>
           <a href="https://www.youtube.com/"  onClick={slideOutOut||null}>
                <i className="fab fa-youtube"></i>
           </a>
      </div>
    )
}

const styles ={
  social:css`display: flex;
  justify-content: space-between;
 
  `

}
export default Social
