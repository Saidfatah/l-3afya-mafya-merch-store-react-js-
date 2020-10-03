import React from 'react'
/** @jsx jsx */
import { jsx, css, Global, ClassNames } from '@emotion/core'
const Hero=()=> {
    return (
      <div css={css`height: 1350;
      height: 450;
      background-color:black;
      img{width:100%}`}>
          <img src={'/images/HeroImages/HeroImage.png'}/>
      </div>
    )
}

export default Hero
