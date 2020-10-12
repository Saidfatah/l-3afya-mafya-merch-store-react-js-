import   React,{useContext,useEffect,useState} from 'react'
import   ProductItem from './ProductItem'
import   {MyContext} from '../../Context/ProductsProvider'
import   {CollectionsContext} from '../../Context/CollectionsProvider'
import   ImagesProvder from '../../Context/ImagesProvder'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const  Products=(props)=> {
    const {products} =useContext(MyContext)
    const {collections} =useContext(CollectionsContext)
    const [collectionProducts,setCollectionProducts] =useState([])
    const [maxProducts,setMaxProducts] =useState([])
    const [allProducts,setAllProducts] =useState([])
    const {productSize,collectionTitle,maxDisplay,productsFromSearch}=props

    useEffect(()=>{    
        let mounted= true; 
        if(collectionTitle != undefined && collections.length>0 && mounted)
        {
            let selectedCollectionProducts = collections.filter(col=>col.title == collectionTitle)[0].products
             selectedCollectionProducts = selectedCollectionProducts.map(product=>({...product,productId:product._id}))
            setCollectionProducts(selectedCollectionProducts.map((product,index)=><ProductItem 
                 key={index} 
                 productSize={productSize} 
                 product={product} 
            />))
        }else
        {
            console.log({maxDisplay})
            if( maxDisplay != -1 && maxDisplay != undefined )return getMaxDisplayProducts()   
            getAllProducts()
        }

        return ()=>{mounted = false }
    },[products.length])

    const getMaxDisplayProducts=()=>{
           let searchedProducts
            if(maxDisplay <= 0)searchedProducts =productsFromSearch
            else searchedProducts =productsFromSearch.slice(1, maxDisplay + 1)
         
            setMaxProducts(searchedProducts.map((product,index)=><ProductItem 
            cardSize={productSize} 
            key={index}  
            product={product} 
            />))
    }
   
    const getAllProducts=()=>{
        if(products == undefined)return ; 
        const allProducts= products.map((product,index)=><ProductItem 
              key={index}  
              cardSize={productSize} 
              product={product} 
        />)
        setAllProducts(allProducts) 
    }

    return (
        <div css={styles.products}>
            <ImagesProvder>
                 {collectionProducts}
                 {maxProducts}
                 {allProducts}
            </ImagesProvder>
        </div>
    )
}


const styles ={
    products :css` 
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom:6rem;
    `,
}

export default Products
