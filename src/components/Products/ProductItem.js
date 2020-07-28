import React,{useEffect,createRef,useState,useContext} from 'react'
import {ImagesContext} from '../../Context/ImagesProvder'
import axios from 'axios'
import {Link} from "react-router-dom"
function ProductItem(props) {
    const img1 = createRef()
    const img2 = createRef()
    const {getImage,setImage1,setImage2} =useContext(ImagesContext)
    const {title,price,productId}=props.product

    useEffect(() => {
          getImage(title).then(src=>{
            setImage(img1,'/images/products/'+title+'/img1.'+src.data) 
            setImage(img2,'/images/products/'+title+'/img2.'+src.data) 
           })
    }, [])
    const setImage=(img,res)=>{ 
       if(img.current != null) img.current.src = res 
     }
    return (
        <Link  to={"/product/"+productId}>
             <div className="card">
                 <div className="card__image">
                     <div className="card__image1">
                         <img ref={img1}  src="" alt="loading ..."/>
                     </div>
                     <div className="card__image2">
                         <img ref={img2}  src="" alt="loading ..."/>
                     </div>
                 </div>
                 <div className="card__info">
                     <div className="card__title">{title}</div>
                     <div className="card__price">{price}</div>
                 </div>
             </div>
        </Link>
        
    )
}

export default ProductItem
