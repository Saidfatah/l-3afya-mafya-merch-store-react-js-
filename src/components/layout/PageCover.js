import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const PageCover=({pageShdowCover,slideOutOut})=> {
    return (<div css={css` display: none;
    width:100%;
    height: 100vh;
    background-color: var(--colorShadowDarker);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 90;
    transition: all .4s ease-in;`}  ref={pageShdowCover} onClick={slideOutOut} ></div>)
}

export default PageCover
