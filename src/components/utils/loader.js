import React from 'react'
/** @jsx jsx */
import {css} from '@emotion/core'

const loader=()=> {
    return (
        <div css={css`
            position: absolute;
            z-index: 9999;
            height: 5p;
            background-color: red;
            width: 100%;
        `}>
        </div>
    )
}

export default loader
