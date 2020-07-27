import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=useState([])
    let [collections,setCollections]=useState([])

   
    const apiurl='http://localhost:4000/'
    const errhandler =err=>console.log(err)
    const apicall =(route,calb)=>axios.get(apiurl+route).then(res=>calb(res.data)).catch(errhandler)
   
    useEffect(()=>{
        apicall('product',setProducts)
        apicall('collection',setCollections)
    },[])

     
    
    const getProductsByString= charcters=>{
           console.log(products.filter(p=>p.title.includes(charcters)))
           return products
    }
    const getUserById=async (id)=>{
        console.log(await axios.get(apiurl+"users/"+id))
        return await axios.get(apiurl+"users/"+id).data
    }
    const getProductById=async (id)=>{
        const product =  await axios.get(apiurl+"product/"+id)
        return product.data
    }
    const getProductsByListOfIds=idsList=>{
        return products.filter(product => idsList[0].includes(product.productId))
    }
    const getImage=(title,callback,image)=>{
         apicall('image/'+title,res=> {
             callback('/images/products/'+title+'/img'+image+'.'+res)
            })
    }
  
     

     return (<MyContext.Provider value={{
           products,
           collections,
           apiurl,
           getProductsByString,
           getProductById,getImage,
           getProductsByListOfIds
           }}>
         {props.children}
        </MyContext.Provider>)
}

export default ProductsProvider
