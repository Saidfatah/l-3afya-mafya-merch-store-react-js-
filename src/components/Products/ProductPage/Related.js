import React,{useEffect,useState,useContext} from 'react'
import {CollectionsContext} from '../../../Context/CollectionsProvider'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {H1} from '../../../Style/global'

const Related=(props)=> {
    const [relatedProducts,setRelatedProducts]=useState([])
    const {getCollections}= useContext(CollectionsContext)
    const {getProducts}= useContext(MyContext)
    const {id}=props


    useEffect(() => {
        getCollections().then(res=>{
            try {
                const collection =res.data.filter(col=> col.products.indexOf(parseInt(id)) != -1)
                let relatedProductsIds ;
                if(collection[0] == undefined)
                  relatedProductsIds =res.data[1].products
                else  
                  relatedProductsIds = collection.map(c=>c.products)[0]
                 relatedProductsIds = relatedProductsIds.splice(0,3)
                getProducts().then(res2=>{
                     const relatedProducts2 =  res2.data.filter(p => relatedProductsIds.indexOf(p.productId) > -1)
                     setRelatedProducts(relatedProducts2)
                })    
            }catch(error){ console.log(error)}
           
        })
     }, [relatedProducts.length >0,id])
   

    return (
        <div css={styles.related}>
            <H1 mgb={2}>Related Products</H1>
            <div css={styles.related__Container}>
                    {relatedProducts.map((product,index)=><ProductItem  key={index}   product={product}  cardSize="medium"/>)}
           </div>
        </div>
    )
}

const styles ={
    related :css` 
    width: 100%;
    `,
    related__Container :css` 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
    `,
}

export default Related
