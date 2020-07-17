import React,{useEffect,createRef,useContext} from 'react'
import {MyContext} from '../../Context/ProductsProvider'
import axios from 'axios'

function ProductItem(props) {
    const img1 = createRef()
    const img2 = createRef()
    const {getImage} =useContext(MyContext)
    const {title,price}=props.product

    useEffect(() => {
        getImage(title,setImage(img1),1)
        getImage(title,setImage(img2),2)
    }, [])
    const setImage=(img)=>(res)=>{
        const blob = new Blob([res.data],{type:res.headers['content-type']});
        const objectURL = URL.createObjectURL(blob);
        if (img.current != null)img.current.src = objectURL
    }

    return (
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
            <div className="card__buttons">
                <button className="card_button ">addToCart</button>
                <button className="card_button ">More</button>
            </div>
     </div>
    )
}

export default ProductItem
