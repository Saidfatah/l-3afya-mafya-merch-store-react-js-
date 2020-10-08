import React,{useEffect,useContext,useState,recentlyViewd, createRef} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'
import cookie from 'js-cookie'
import {easer} from '../../utils/funcs1'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {H1} from '../../../Style/global'



const RecentlyViewd=()=> {
     const {getProducts} =useContext(MyContext)
     const [recentlyViewdItems,setRecentlyViewd]=useState([])
     const recentlyViewdRef= createRef()
     const recentlyViewd__ContainerRef= createRef()
     const btn_leftRef= createRef()
     const btn_rightRef= createRef()
     const productItemWidth = 300



     useEffect(() => {
        let  recentlyViewIds =cookie.get('recentlyViewd')
        recentlyViewIds=JSON.parse(recentlyViewIds)
        getProducts().then(res=>{
            const recentlyVisted =  res.data.filter(p => recentlyViewIds.indexOf(p.productId) > -1)
            setRecentlyViewd(recentlyVisted)
        })
      
     }, [])

     const countProducts=(dir)=>{
        const productsContainerWidth=parseInt(recentlyViewd__ContainerRef.current.offsetWidth) ;
        const recentlyVistedWidth=parseInt(recentlyViewdRef.current.offsetWidth) ;
        const productsContainerX= Math.abs(parseInt(recentlyViewd__ContainerRef.current.offsetLeft))-16 ;
        const productWidth =productItemWidth+16;

        const overFlowProductsLeft=Math.round(productsContainerX/productWidth)
        const overFlowedProductsRight=Math.round((productsContainerWidth - (productsContainerX+16+recentlyVistedWidth))/productWidth)
        return dir>0?overFlowedProductsRight : overFlowProductsLeft;
     }
     const slide = (dir)=>{
          const overflowProducts = countProducts(-dir);
          const productWidth =productItemWidth+16;
          const Slide_amount = dir * productWidth *(overflowProducts >=3 ? 3:overflowProducts)
          const X= parseInt(recentlyViewd__ContainerRef.current.offsetLeft);
          const easer_calb=(value)=> recentlyViewd__ContainerRef.current.style.left=(value )+'px'
          easer(X, X + Slide_amount,easer_calb,100)
          countProducts(-dir);
     }
     const slideStoriesLeft = (e)=>{e.preventDefault(); slide(1)}
     const slideStoriesRight = (e)=>{e.preventDefault();  slide(-1)}


    return (
        <div>
            <H1 mgb={2}>Related Products</H1>
            <div css={styles.recentlyViewd} ref={recentlyViewdRef}>
                <div>
                    {
                        recentlyViewdItems.length>5 
                        ?<>
                         <a href="#" css={css`${styles.stories__btn};${styles.btn_left}`} ref={btn_leftRef} onClick={slideStoriesLeft}>
                             <div css={css`${styles.btn__image};${styles.image_left}`} ></div>
                         </a>
                         <a href="#" css={css`${styles.stories__btn};${styles.btn_right}`} ref={btn_rightRef} onClick={slideStoriesRight}>
                             <div css={css`${styles.btn__image};${styles.image_right}`} ></div>
                         </a>  
                        </>
                        :null
                    }
                   <div css={styles.recentlyViewd__Container} ref={recentlyViewd__ContainerRef}>
                      {recentlyViewdItems.map((product,index)=><ProductItem  key={index}   product={product} cardSize="small" />)}
                   </div>
                </div>
            </div>
        </div>
    )
}

const styles ={
    recentlyViewd :css` 
    width:100%;
    padding:2rem 4rem;
    margin-bottom: 3rem;

    >div{
        position: relative;
        width:100%;
        height: 420px;
        overflow: hidden;
    }

    `,
    stories__btn :css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    :focus{
        outline: none;
    }
    `,
    btn_left :css` left:2%;`,
    btn_right:css`right:2%;`,
    btn__image:css` background-image: url("https://instagram.com/static/bundles/es6/sprite_glyphs_03eea17932ef.png/03eea17932ef.png");
    background-repeat: no-repeat;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    `,
    image_left:css` background-position: -185px -226px;`,
    image_right:css` background-position: -232px -226px;`,
    recentlyViewd__Container:css`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    height: 80%;
    width: fit-content;
    transition: all .3s ease-out;
    `, 
}
export default RecentlyViewd


