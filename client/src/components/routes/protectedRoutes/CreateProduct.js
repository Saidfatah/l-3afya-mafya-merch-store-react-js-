import React from 'react'
import ProductForm from './ProductForm'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'


const CreateProduct=()=> {
    return (
        <div css={styles.checkout}>
            <ProductForm />
        </div>
    )
}

const styles ={
    checkout :css` 
    display: flex;
    padding: 1rem;
    min-height: 100vh;
    justify-content: center;
    h1{
        text-align: center;
        font-size: 2rem;
        letter-spacing: 5px;
    }
    `,
}
export default CreateProduct
