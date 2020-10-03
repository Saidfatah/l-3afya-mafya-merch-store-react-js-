import React,{useState,useEffect,useContext,createRef} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ImagesProvder from '../../../Context/ImagesProvder'
import ProductImages from './ProductImages'
import RecentlyViewd from './RecentlyViewd'
import AddToCart from './AddToCart'
import Related       from './Related'
import cookie from 'js-cookie'
import { useParams } from 'react-router-dom'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductPage=()=>{
    const [quantity,setQuantity]=useState(1)
    const [selectedSize,setSize]=useState("M")
    const [product,setProduct]=useState({character:["dd"]})

    const [prevSelectedSize,setPrevSelectedSize]=useState(null)
    const {getProductById} =useContext(MyContext)
    const {id}= useParams()
  

    const getRecentlyVisted=()=>{
        let recentlyCiewdCookei= cookie.get('recentlyViewd')
        if(recentlyCiewdCookei != undefined)
        {   
            recentlyCiewdCookei=JSON.parse(recentlyCiewdCookei).map(id=>parseInt(id))  
            recentlyCiewdCookei.push(parseInt(id))
            let set = new Set([...recentlyCiewdCookei]);
            cookie.set('recentlyViewd',[...set])
        }
        else cookie.set('recentlyViewd',[])
    } 
    useEffect(() => {
        getRecentlyVisted()
        getProductById(id).then(res=>setProduct(res.data) )
    }, [id])
    
    const updateQuantity=e=>{
        const inc = e.target.innerHTML =="+"?1 : (quantity <= 1 ? 0 : -1 );
        setQuantity(quantity +inc )
    }
    const chooseSize=e=>{
        e.preventDefault()
        if(e.target.tagName.toLowerCase()=="li"){
            console.log(e.target.innerHTML)
            setSize(e.target.innerHTML)
            e.target.classList.add('selected-Size')
            if(prevSelectedSize != null) prevSelectedSize.classList.remove('selected-Size')
            setPrevSelectedSize(e.target)
        }
    }




  

  
    return (
        <div css={styles.productPage}>
            <div  css={styles.product__Info__wrapper}>
                 <div  css={styles.product__Info__wrapper__wrapper}>
                     <div  css={styles.product__Info}>
                         <h2>{product.title}</h2>
                         <p>{product.price}.00$</p>
                         <div  css={styles.border}></div>
                         <ul  css={styles.product__charactersristics}>
                             {product.character.map((char,index)=><li key={index}>{char}</li>)} 
                         </ul> 
                          {
                         product.hasSize
                         ?<ul css={styles.product__size} onClick={chooseSize}>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                            <li>2X</li>
                            <li>3X</li>
                         </ul>
                         :''
                         }
                         <div css={styles.quantity}>
                             <span css={styles.quantityIcon} onClick={updateQuantity}>-</span>
                             <input type="text" onChange={e=>e.preventDefault()} value={quantity}/>
                             <span css={styles.quantityIcon} onClick={updateQuantity}>+</span>
                         </div>
                         <AddToCart  id={id} quantity={quantity} selectedSize={selectedSize}  />
                     </div>
                 </div>
                 <ImagesProvder>
                    <ProductImages id={id} />
                 </ImagesProvder>
            </div>
            <Related id={id}/>
            <div className="border-faint mgb5 "></div>
            <RecentlyViewd /> 
        </div>
    )
}
const styles ={
    productPage :css` 
    height: fit-content;
    position: relative;
    height: fit-content;
    margin-top: 75px;`,
    product__Info__wrapper__wrapper :css`
    width: 30%;
    height: 1600px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    height: 100%;`,
    product__Info__wrapper :css`height: 100vh;`,
    product__Info:css` 
    height: 100%;
    width: 100%;
    color: var(--colorGrey);
    h2{
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 1.5rem;
        color: #000;
    }
    p{ color: #000;}
    `,
    product__charactersristics:css`
    product__charactersristics
    li{
        margin-bottom: 1rem;
    }
    `,
    product__size:css`
    display: flex;
    width:100%;
    list-style: none;
    padding: 0 .5rem;
    height: 45px;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid var(--colorGrey);
    margin-bottom: 1rem;
    li{
        padding: .25rem;
        margin-right: .5rem;
        cursor: pointer;
    }
    li:not(.selected-Size):hover{
        color: var(--colorBlack);
    }
    li:hover{
        transform: scale(1.2);
    }
    `,
    border:css`width: 100%;
    height: 1px;
    margin-top: 2rem;
    margin-bottom: 1rem;
    background-color: var(--colorGreyFaint);
    `,
    quantity:css`border: 1px solid var(--colorGrey);
    display: flex;
    height: 45px;
    width: 139px;
    padding: 0 .5rem;
    justify-content: space-between;
    align-items: center;
    font-family: "Century Gothic",sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #7c7676;
    line-height: 1.65;
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

export default ProductPage
