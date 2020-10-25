import React,{useEffect,createRef} from 'react'
import {Link} from "react-router-dom"
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductItem=(props)=> {
    const img1 = createRef()
    const img2 = createRef()
    const {title,price,productId,images}=props.product
    const {cardSize}=props

    useEffect(() => {
        console.log(cardSize)
        setImage(img1,'/images/products/'+title+'/'+images[0]) 
        setImage(img2,'/images/products/'+title+'/'+images[1]) 
    }, [title])

    const setImage=(img,res)=>{ 
       if(img.current != null) img.current.src = res 
     }

    return (
        <Link  to={"/product/"+productId}>
             <div  css={css`${styles.card};  ${cardSize && cardSize =='small'?styles.cardSmall:styles.cardMedium}` } >
                 <div css={css`${styles.card__image};  
                      ${(()=>{
                               if(cardSize =="noSize")return ""
                               if(cardSize =='small')return 'height:210px;' 
                               if(cardSize =='medium')return 'height:200px;' 
                     })() }`}> 
                     <div css={styles.card__image1}> <img ref={img1}  src="" alt="loading ..."/> </div>
                     <div  css={styles.card__image2}> <img ref={img2}  src="" alt="loading ..."/> </div>
                 </div>
                 <div css={styles.card__info}>
                     <div css={styles.card__title}>{title}</div>
                     <div css={styles.card__price}>${price}</div>
                 </div>
             </div>
        </Link>
    )
}

const styles ={
    card :css` 
    width: 300px;
    height:fit-content;
    margin-bottom: 2rem;
    cursor: pointer;
    `,
    cardMedium :css` 
    height: fit-content; 
    width: 260px;
    `,
    cardSmall :css` 
    height: fit-content; 
    width: 200px;
     
    `,
    card__image :css` 
    height:350px;
    width: 100%;
    position: relative;
    img{
        width: 100%;
    }
    `,
    card__image1 :css` 
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
    `,
    card__image2 :css` 
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 0;
    :hover{
        opacity: 1;
    }
    `,
    card__info :css` 
    position: relative;
    text-align: center;
    z-index: 9;
    `,
    card__title :css` 
    color: var(--colorBlack);
    `,
    card__price :css` 
    color: var(--colorBlack);
    `,
}

export default ProductItem
