import React,{useEffect,useContext,useState,recentlyViewd, createRef} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'
import cookie from 'js-cookie'
const easer=(startValue ,targetValue, clb,speed)=>
{
    
    const distance= targetValue - startValue
    const duration = speed
    let start= null

    window.requestAnimationFrame(step)
    function step(timestamp)
    {
       if(!start) start=timestamp
       const progress= timestamp - start
       clb(easeOutCirc(progress, startValue, distance, duration))
       if(progress < duration) window.requestAnimationFrame(step)
    }
    function easeOutCirc  (t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t*t) + b;
    };
  

}
const getParentRecursive= (elem,className)=>{
    if(elem.classList.contains(className))
      return elem
    return getParentRecursive(elem.parentElement,className)
}
function RecentlyViewd() {
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
            const  ids= recentlyViewIds.map(id=>parseInt(id))
            console.log(ids)
            const recentlyVisted =  res.data.filter(p => ids.indexOf(p.productId) > -1)
            setRecentlyViewd(recentlyVisted)
        })
      
     }, [recentlyViewdItems.length >0])

     const toggleSliderBtns=(overFlowedProductsLeft, overFlowedProductsRight)=>{
        //  btn_leftRef.current.style.display=overFlowedProductsRight>0?'inline':'none'
        //  btn_rightRef.current.style.display=overFlowedProductsLeft>0?'inline':'none'
     }
     const countProducts=(dir)=>{
        const productsContainerWidth=parseInt(recentlyViewd__ContainerRef.current.offsetWidth) ;
        const recentlyVistedWidth=parseInt(recentlyViewdRef.current.offsetWidth) ;
        const productsContainerX= Math.abs(parseInt(recentlyViewd__ContainerRef.current.offsetLeft))-16 ;
        const productWidth =productItemWidth+16;

        const overFlowProductsLeft=Math.round(productsContainerX/productWidth)
        const overFlowedProductsRight=Math.round((productsContainerWidth - (productsContainerX+16+recentlyVistedWidth))/productWidth)
        toggleSliderBtns(overFlowProductsLeft,overFlowedProductsRight)
        return dir>0?overFlowedProductsRight : overFlowProductsLeft;
     }
     const slide = (dir)=>{
          const overflowProducts = countProducts(-dir);
          const productWidth =productItemWidth+16;
          const Slide_amount = dir * productWidth *(overflowProducts >=4 ? 4:overflowProducts)
          const X= parseInt(recentlyViewd__ContainerRef.current.offsetLeft);
          const easer_calb=(value)=> recentlyViewd__ContainerRef.current.style.left=(value )+'px'
          easer(X, X + Slide_amount,easer_calb,100)
          countProducts(-dir);
     }
     const slideStoriesLeft = (e)=>{e.preventDefault(); slide(-1)}
     const slideStoriesRight = (e)=>{e.preventDefault();  slide(1)}
    return (
        <div>
            <h1>Recently Viewd</h1>
            <div className="recentlyViewd" ref={recentlyViewdRef}>
                 <a href="#" className="stories__btn btn_left" ref={btn_leftRef} onClick={slideStoriesLeft}>
                     <div className="btn__image image_left" ></div>
                 </a>
                 <a href="#" className="stories__btn btn_right" ref={btn_rightRef} onClick={slideStoriesRight}>
                     <div className="btn__image image_right"></div>
                 </a>    
                 <div className="recentlyViewd__Container" ref={recentlyViewd__ContainerRef}>
                    {recentlyViewdItems.map((product,index)=><ProductItem  key={index}   product={product}  />)}
                 </div>
            </div>
        </div>
    )
}

export default RecentlyViewd


