import React,{useEffect,useState,useContext} from 'react'
import {CollectionsContext} from '../../../Context/CollectionsProvider'
import Slider from '../../layout/Slider'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {H1} from '../../../Style/global'

const Related=(props)=> {
    const [relatedProducts,setRelatedProducts]=useState([])
    const {getCollections}= useContext(CollectionsContext)
    const {id}=props


    useEffect(() => {
        getCollections().then(res=>{
            try {
                const collectionsArr = res.data
                const collectionProducts =collectionsArr.map(col=>({prds:col.products,title:col.title}))
                const collectionProductsIds =collectionProducts.map(col=>({ids:col.prds.map(p=>p._id),title:col.title}))

                const productsRelatedIds =collectionProductsIds.filter(ids=> ids.ids.indexOf(id) != -1 )[0]
                let relatedProductsPRODUCTS = collectionProducts.filter(prs=> prs.title == productsRelatedIds.title )[0]
                 if(relatedProductsPRODUCTS != undefined)
                 {
                     relatedProductsPRODUCTS = relatedProductsPRODUCTS.prds.map(prd=>({...prd,productId:prd._id}))
                     relatedProductsPRODUCTS.forEach(product => {
                         delete product.__v;
                         delete product._id;
                     });
                     setRelatedProducts(relatedProductsPRODUCTS)
                 }
            }catch(error){ console.log(error)}
           
        })
     }, [relatedProducts.length >0,id])
   

    return (
        <div css={styles.related}>
            <H1 mgb={2}>Related Products</H1>
            <Slider items={relatedProducts}/>
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
