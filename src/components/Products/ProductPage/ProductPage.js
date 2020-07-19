import React,{useState,useEffect,useContext} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductImages from './ProductImages'
import RecentlyViewd from './RecentlyViewd'
import Related       from './Related'
import cookie from 'js-cookie'
import { useParams } from 'react-router-dom'
function ProductPage(props) {
    const [quantity,setQuantity]=useState(1)
    const [selectedSize,setSize]=useState("S")
    const [prevSelectedSize,setPrevSelectedSize]=useState(null)
    const {getProductById} =useContext(MyContext)

    const {id}= useParams()
    const {title,price,hasSize}= getProductById(id)
    
    useEffect(() => {
        let recentlyCiewdCookei= cookie.get('recentlyViewd')
        const arr = cookie.get('arr')

        if(recentlyCiewdCookei != undefined)
        {   
            recentlyCiewdCookei=JSON.parse(recentlyCiewdCookei)
            recentlyCiewdCookei.push(id)
            let set = new Set(...recentlyCiewdCookei);
            cookie.set('recentlyViewd',[...set])
        }
        else cookie.set('recentlyViewd',[])
     

     }, [])

    const updateQuantity=e=>{
        const inc = e.target.innerHTML =="+"?1 : (quantity <= 1 ? 0 : -1 );
        setQuantity(quantity +inc )
    }
    const chooseSize=e=>{
        if(e.target.tagName.toLowerCase()=="li"){
            setSize(e.target.innerHTML)
            e.target.classList.add('selected-Size')
            if(prevSelectedSize != null) prevSelectedSize.classList.remove('selected-Size')
            setPrevSelectedSize(e.target)
        }
    }


    return (
        <div className="productPage">
            <div  className="product__Info__wrapper">
               <div className="product__Info__wrapper__wrapper">
                 <div className="product__Info">
                     <h2>{title}</h2>
                     <p>{price}</p>
                     <div className="borderB"></div>
                     <ul className="product__charactersristics">
                         <li>100% cotton jersey</li>
                         <li>6 oz/sqyd</li>
                         <li>Preshrunk</li>
                     </ul>
                     {
                      hasSize?<ul className="product__size" onClick={chooseSize}>
                      <li>S</li>
                      <li>M</li>
                      <li>L</li>
                      <li>XL</li>
                      <li>2X</li>
                      <li>3X</li>
                     </ul>:''
                     }
                     <div className="quantity">
                         <span className="quantity__icon" onClick={updateQuantity}>-</span>
                         <input type="text" value={quantity}/>
                         <span className="quantity__icon" onClick={updateQuantity}>+</span>
                     </div>
                     <button className="btn" type="submit">SUBSCRIBE</button>
                     
                 </div>
            </div>
               <ProductImages title={title} />
            </div>
            <RecentlyViewd /> 
        </div>
    )
}

export default ProductPage
