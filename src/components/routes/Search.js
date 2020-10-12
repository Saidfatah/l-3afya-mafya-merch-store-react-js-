import React,{useContext,useState,useEffect} from 'react'
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
import {useParams} from "react-router-dom";
import {H1,Input,Container,LightParagraph} from '../../Style/global'

const Search=(props)=> {
    const {searchResult,getProducts}=useContext(MyContext)
    const [searchQuery,setSearchQuery]=useState('')
    const [searchCount,setSearchCount]=useState('')
    const [products,setProducts]=useState([])
    const {query}=useParams()
    const {hasPram}=props

    
    useEffect(()=>{
        let productsSearched= searchResult

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
        <H1>Search</H1>
        <LightParagraph >Enter a word to search our products:</LightParagraph>
        <Input type="text" onKeyPress={searchSubmit} placeholder="Search..."/>
        </div>
    }
    const ResultsDsiplay=()=>{
        return <div>
        <H1>Search</H1>
        <LightParagraph>{searchCount} results for "{searchQuery}"</LightParagraph>
        <Products productsFromSearch={products} productSize="small" />
       </div>
    }
    return (
        <Container verticalCenter>
             {products.length<=0 ?searchFrom():ResultsDsiplay()}
        </Container>

    )
}



export default Search
