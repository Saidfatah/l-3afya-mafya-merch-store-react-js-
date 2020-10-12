import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Quanitity=({updateQuantity,quantity,small})=> {
    return (
    <div css={css`${styles.quantity};${small
        ?`height:40px;
         width: 90px;`
        :`height: 45px;
         width: 139px;`}
        `}>
        <span css={styles.quantityIcon} onClick={updateQuantity}>-</span>
        <input type="text" onChange={e=>e.preventDefault()} value={quantity}/>
        <span css={styles.quantityIcon} onClick={updateQuantity}>+</span>
    </div>
    )
}

const styles ={
    quantity:css`
    border: 1px solid var(--colorGreyLight);
    display: flex;
    padding: 0 .5rem;
    justify-content: space-between;
    align-items: center;
    color:var(--colorGreyLight);
    line-height: 1.65;
    span,input{
        color:var(--colorGreyLight);
    }
    input{
        border: none;
        margin: 0;
        text-align: center;
        width: 35px;
        padding: 0;
    }
    input:focus{
        outline: none;
     }
    `,
    quantityIcon:css`cursor: pointer;
    font-size: 1.25rem;
    `,
}


export default Quanitity
