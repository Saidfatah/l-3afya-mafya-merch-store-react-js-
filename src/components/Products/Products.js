import   React,{useContext,useEffect,useState} from 'react'
import   ProductItem from './ProductItem'
import   {MyContext} from '../../Context/ProductsProvider'
import   {CollectionsContext} from '../../Context/CollectionsProvider'
import   ImagesProvder from '../../Context/ImagesProvder'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const  Products=(props)=> {
    const {products,getProducts} =useContext(MyContext)
    const {getCollections} =useContext(CollectionsContext)
    const [collectionProducts,setCollectionProducts] =useState([])
    const [maxProducts,setMaxProducts] =useState([])
    const [allProducts,setAllProducts] =useState([])
    const {productSize,collectionTitle,maxDisplay,productsFromSearch}=props

    useEffect(()=>{
        let gotCollections = false; 

        getCollections()
        .then(res=>{
            let collection = res.data.filter(collection=>collection.title == collectionTitle)
            gotCollections=collection.length>0  ; 
            collection>0 
            ?getCollectionProducts(collection) 
            : maxDisplay != undefined 
                 ?getMaxDisplayProducts() 
                 : getAllProducts()
        })
        .catch(err=>console.log(err))


        if(!gotCollections)
        {
      
           if(products.length>=1) return;
            getAllProducts()
        }

    },[products.length>0])

    const getMaxDisplayProducts=()=>{
        if(maxDisplay != undefined){ 

            const searchedProducts =maxDisplay != -1? productsFromSearch.slice(1, maxDisplay + 1):productsFromSearch
            setMaxProducts(searchedProducts.map((product,index)=><ProductItem key={index}  cardSize={productSize} product={product} />))
         }
    }
    const getCollectionProducts=(collection)=> {
          getProducts().then(res=>{
              const  ids= collection[0].products
              const collectionProdycts =  res.data.filter(p => ids.indexOf(p.productId) > -1)
              setCollectionProducts(collectionProdycts.map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />))
          })
    }
    const getAllProducts=()=>setAllProducts(products.map((product,index)=><ProductItem key={index}  cardSize={productSize} product={product} />)) 

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
