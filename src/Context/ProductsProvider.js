import React ,{createContext,useState,useEffect,useMemo} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=useState([])
    let [searchResult,setSearchResult]=useState([])
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
   
    useEffect(()=>{
        axios.get(apiurl+'product').then(res=> setProducts(res.data)).catch(errhandler)
        console.log('search result changed')
    },[searchResult.length>0,products.length>0])
    
    const getProductById= (id)=> axios.get(apiurl+"product/"+id) 
    const getProducts=()=> axios.get(apiurl+'product')
    const value = useMemo(()=>({
        products,
        searchResult,
        setSearchResult,
        getProductById,
        getProducts,
    }),[getProducts,getProducts,setSearchResult,getProductById,searchResult,products])
    
    
    return (<MyContext.Provider value={value}>
         {props.children}
        </MyContext.Provider>)
}

export default ProductsProvider
