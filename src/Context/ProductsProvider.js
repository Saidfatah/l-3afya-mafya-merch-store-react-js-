import React ,{createContext,useState,useEffect,useMemo} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=useState([])
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
   
    useEffect(()=>{axios.get(apiurl+'product').then(res=> setProducts(res.data)).catch(errhandler)},[])
    
    const getProductsByString= charcters=>{
           console.log(products.filter(p=>p.title.includes(charcters)))
           return products
    }
    const getUserById=id=>axios.get(apiurl+"users/"+id).data

    const getProductById= (id)=> axios.get(apiurl+"product/"+id) 
    const intersect = (a, b)=> {
        let t
        if (b.length > a.length){
             t = b
             b = a
             a = t
        }
        return a.filter(e=> b.indexOf(e) > -1 );
    }
    const getProducts=()=> axios.get(apiurl+'product')

    const value=useMemo(()=>({
        products,
        getProductsByString,
        getProductById,
        getProducts
    }),[getProducts,getProducts,getProductById,getProductsByString,products])
    
    
    return (<MyContext.Provider value={value}>
         {props.children}
        </MyContext.Provider>)
}

export default ProductsProvider
