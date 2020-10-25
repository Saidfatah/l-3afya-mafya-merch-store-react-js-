import React ,{createContext,useState,useEffect,useMemo} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=useState([])
    let [searchResult,setSearchResult]=useState([])
    const apiurl=process.env.API_URL
    const errhandler =err=>console.log(err)
   
    useEffect(()=>{
        let CancelToken =axios.CancelToken;
        let cancel
        (async()=>{
            try {
                axios.get(apiurl+'/product',{cancelToken: new CancelToken((c)=>cancel = c )})
                .then(res=> {
                    if(res.data != undefined)setProducts(res.data)
                })
                .catch(errhandler)
            } catch (error) {
                console.log(error)
            }
        })()
        return ()=>{cancel && cancel()}
    },[])
    
    const getProductById= (id)=> axios.get(apiurl+"/product/"+id) 
    const getProducts=()=> axios.get(apiurl+'/product')


    
    
    return (<MyContext.Provider value={ 
        {products,
        searchResult,
        setSearchResult,
        getProductById,
        getProducts}}>
         {props.children}
        </MyContext.Provider>)
}

export default ProductsProvider
