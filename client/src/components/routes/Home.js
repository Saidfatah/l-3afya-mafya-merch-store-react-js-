import React from 'react'
import Products from '../Products/Products'
import Hero from '../layout/Hero'
/** @jsx jsx */
import { jsx,css } from '@emotion/core'

const Home=()=> {
    return (
        <div css={styles.Home}>
            <Hero/>
            <Products productSize="noSize"/>
        </div>
    )
}

const styles ={
    Home:css` 
     min-height: 45vh;
     width: 100%;
    `,
}

export default Home
