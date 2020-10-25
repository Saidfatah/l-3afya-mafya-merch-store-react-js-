import React,{useRef,useState,useEffect} from 'react'
import ProductItem from '../Products/ProductItem'
import {easer} from '../utils/funcs1'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'


const Slider=(props)=> {
    const {items} = props 
    const sliderParentRef= useRef()
    const btn_leftRef= useRef()
    const btn_rightRef= useRef()
    const sliderRef= useRef()
    const productItemWidth= 200
    const [windowWidth, setwindowWidth] = useState(0)
    const [currentProductsOnTheRightSide, setcurrentProductsOnTheRightSide] = useState(0)
    const [currentProductsOnTheLeftSide, setcurrentProductsOnTheLeftSide] = useState(0)
 

    useEffect(() => {
        setwindowWidth(parseInt(window.innerWidth))
            
        if( sliderRef.current && parseInt(window.innerWidth) <= 460)
           sliderRef.current.style.left=60+'px'

        const listner =  window.addEventListener('resize', e=>{
            const docWidth =parseInt(window.innerWidth)
            setwindowWidth(docWidth)
        });
        return () => {
            window.removeEventListener('resize',listner)
        }
    }, [sliderRef.current])

    const countProducts=(dir)=>{
        let count = 0 ;
        const countProductsVisible= Math.round((parseInt(sliderParentRef.current.offsetWidth)-128)/productItemWidth );
        const rightThreshehold = items.length - countProductsVisible

        if(dir>0)
        {
            if(windowWidth > 460 && currentProductsOnTheRightSide >= rightThreshehold) return 0 ; 

            if(currentProductsOnTheRightSide < (items.length -1) )
            {
                 setcurrentProductsOnTheRightSide(currentProductsOnTheRightSide + 1 )

                if(currentProductsOnTheLeftSide <= 0)
                     setcurrentProductsOnTheLeftSide(0)
                else
                     setcurrentProductsOnTheLeftSide(currentProductsOnTheLeftSide - 1 )

                 count=Math.abs(currentProductsOnTheRightSide + 1)
            }
        }else
        {
            if(currentProductsOnTheRightSide <= 0) return 0;
            if(currentProductsOnTheLeftSide < (items.length -1))
            {
                 setcurrentProductsOnTheLeftSide(currentProductsOnTheLeftSide + 1 )

                 if(currentProductsOnTheRightSide <= 0)
                      setcurrentProductsOnTheRightSide(0)
                 else
                      setcurrentProductsOnTheRightSide(currentProductsOnTheRightSide - 1 )

                 count=Math.abs(currentProductsOnTheLeftSide + 1)
            }
        }

        return count;
    }

    const slide = (dir)=>{
          const overflowProducts = countProducts(-dir);
          let Slide_amount = 0
          console.log(overflowProducts)
          if(overflowProducts<= 0)return ;

          if(windowWidth > 460)
            Slide_amount = dir *(productItemWidth+16 )
          else Slide_amount= ( dir * productItemWidth )

          const X= parseInt(sliderRef.current.offsetLeft)
          const easer_calb=(value)=> sliderRef.current.style.left=(value )+'px'
          easer(X, X + Slide_amount,easer_calb,100)
    }
    const slideStoriesLeft = (e)=>{e.preventDefault(); slide(1)}
    const slideStoriesRight = (e)=>{e.preventDefault();  slide(-1)}
    
    const SliderButtons=()=>{
        if(items.length > 6 || (items.length <= 6 && windowWidth <= 460)) 
        return <>
                <a 
                href="#" 
                css={css`${styles.stories__btn};${styles.btn_left}`} 
                ref={btn_leftRef} 
                onClick={slideStoriesLeft}
                >
                    <div css={css`${styles.btn__image};${styles.image_left}`} ></div>
                </a>
                <a 
                href="#" 
                css={css`${styles.stories__btn};${styles.btn_right}`} 
                ref={btn_rightRef} 
                onClick={slideStoriesRight}
                >
                    <div css={css`${styles.btn__image};${styles.image_right}`} ></div>
                </a>  
               </>
       
       return null 
    }


    return (
            <div css={styles.recentlyViewd} ref={sliderParentRef}>
                <div>
                   <SliderButtons />
                   <div css={styles.recentlyViewd__Container} ref={sliderRef}>
                      {  items.map((product,index)=><ProductItem  key={index}   product={product} cardSize="small" />)}
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
    }
    `,
    stories__btn :css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 60;
    :focus{
        outline: none;
    }
    `,
    btn_left :css`left:2%;`,
    btn_right:css`right:2%;`,
    btn__image:css` 
    background-image: url("https://instagram.com/static/bundles/es6/sprite_glyphs_03eea17932ef.png/03eea17932ef.png");
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

export default Slider
