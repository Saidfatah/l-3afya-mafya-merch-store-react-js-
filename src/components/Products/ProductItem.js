import React,{useEffect,createRef,useContext} from 'react'
import {MyContext} from '../../Context/ProductsProvider'
import axios from 'axios'
import {Link} from "react-router-dom"
function ProductItem(props) {
    const img1 = createRef()
    const img2 = createRef()
    const {getImage} =useContext(MyContext)
    const {title,price,productId}=props.product

    useEffect(() => {
        getImage(title,setImage(img1),1)
        getImage(title,setImage(img2),2)
    }, [])
    const setImage=(img)=>(res)=>{
            img.current.onerror = ()=> {
                  img.current.src =res.split('.png')[0]+'.jpg'
            }
            if (img.current != null)img.current.src =res
    };




    return (
        <Link  to={"/product/"+productId}>
        <div className="card">
            <div className="card__image">
                <div className="card__image1">
                    <img ref={img1}  src=""alt="loading ..."/>
                </div>
                <div className="card__image2">
                    <img ref={img2}src="" alt="loading ..."/>
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
