import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=useState([])

   
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
    const apicall =(route,calb)=>axios.get(apiurl+route).then(res=>calb(res.data)).catch(errhandler)
   
    useEffect(()=>{
        apicall('product',setProducts)
    },[])

     
    
    const getProductsByString= charcters=>{
           console.log(products.filter(p=>p.title.includes(charcters)))
           return products
    }
    const getUserById=async (id)=>{
        return await axios.get(apiurl+"users/"+id).data
    }
    const getProductById=async (id)=>{
        const product =  await axios.get(apiurl+"product/"+id)
        return product.data
    }
    const getProductsByListOfIds=idsList=>{
        return products.filter(product => idsList[0].includes(product.productId))
    }
    
    
    return (<MyContext.Provider value={{
           products,
           apiurl,
           getProductsByString,
           getProductById,
           getProductsByListOfIds
           }}>
         {props.children}
        </MyContext.Provider>)
}

export default ProductsProvider
