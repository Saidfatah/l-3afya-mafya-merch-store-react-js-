import React,{useContext,useState,useEffect} from 'react'
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
import {useParams} from "react-router-dom";
import {H1} from '../../Style/global'
/** @jsx jsx */
import { jsx,css } from '@emotion/core'

const Search=(props)=> {
    const {searchResult,getProducts}=useContext(MyContext)
    const [searchQuery,setSearchQuery]=useState('')
    const [searchCount,setSearchCount]=useState('')
    const [products,setProducts]=useState([])
    const {query}=useParams()
    const {hasPram}=props

    
    useEffect(()=>{
        let productsSearched= searchResult
        console.log({searchResult})
        console.log({query})
        console.log({hasPram})

        if(searchResult.length>0 && !hasPram) {
            setProducts(productsSearched)
            setSearchCount(productsSearched.length)
            setSearchQuery(query)
        }
    },[searchResult,searchCount])
    
    const searchSubmit = e=>{
        if (e.key.toLowerCase() == 'enter') {
            setSearchQuery(e.target.value)
            getProducts().then(res=>{
                const fecthedProducts = res.data
                const resultsFiltered = fecthedProducts.filter(p=>p.title.includes(searchQuery))
                setProducts(resultsFiltered)
                setSearchCount(resultsFiltered.length)
            })
        }
    }


    const searchFrom =()=>{
        return <div>
        <h1 className="textCenter">Search</h1>
        <p className="textCenter">Enter a word to search our products:</p>
        <input type="text" onKeyPress={searchSubmit} placeholder="Search..."/>
        </div>
    }
    const ResultsDsiplay=()=>{
        return <div>
        <H1>Search</H1>
        <h2>{searchCount} results for "{searchQuery}"</h2>
        <Products productsFromSearch={products} />
       </div>
    }
    return (
        <div css={styles.searchPage}>
             {products.length<=0 ?searchFrom():ResultsDsiplay()}
        </div>

    )
}

const styles ={
    searchPage:css` 
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    input{
        width:182;
        height: 143;
        margin-top: 1rem;
    }
    h1{
        margin-bottom: 1rem;
       font-size: 13px;
    }
    p{
        margin-bottom: 1rem;
        font-size: 13px;
        color: var(--colorGreyLight);
     }
     
    `,
}

export default Search
