import React,{useEffect,useContext,useState,recentlyViewd, createRef} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'
import cookie from 'js-cookie'
import {useParams} from "react-router-dom";
import {easer,getParentRecursive} from '../../utils/funcs1'

function RecentlyViewd() {
     const {getProducts} =useContext(MyContext)
     const [recentlyViewdItems,setRecentlyViewd]=useState([])
     const recentlyViewdRef= createRef()
     const recentlyViewd__ContainerRef= createRef()
     const btn_leftRef= createRef()
     const btn_rightRef= createRef()
     const productItemWidth = 300
     const {id}= useParams()
     useEffect(() => {
        let  recentlyViewIds =cookie.get('recentlyViewd')
        recentlyViewIds=JSON.parse(recentlyViewIds)
        getProducts().then(res=>{
            const  ids= recentlyViewIds.map(id=>parseInt(id))
            const recentlyVisted =  res.data.filter(p => ids.indexOf(p.productId) > -1)
            setRecentlyViewd(recentlyVisted)
        })
      
     }, [recentlyViewdItems.length >0])

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
            <h1 className="h-centered">Recently Viewd</h1>
            <div className="recentlyViewd" ref={recentlyViewdRef}>
                <div>
                   <a href="#" className="stories__btn btn_left" ref={btn_leftRef} onClick={slideStoriesLeft}>
                       <div className="btn__image image_left" ></div>
                   </a>
                   <a href="#" className="stories__btn btn_right" ref={btn_rightRef} onClick={slideStoriesRight}>
                       <div className="btn__image image_right"></div>
                   </a>    
                   <div className="recentlyViewd__Container" ref={recentlyViewd__ContainerRef}>
                      {recentlyViewdItems.map((product,index)=><ProductItem  key={index}   product={product} cardSize="small" />)}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default RecentlyViewd


