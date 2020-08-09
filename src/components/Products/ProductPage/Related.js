import React,{useEffect,useState,useContext} from 'react'
import {CollectionsContext} from '../../../Context/CollectionsProvider'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'

function Related(props) {
    const [relatedProducts,setRelatedProducts]=useState([])
    const {getCollections}= useContext(CollectionsContext)
    const {getProducts}= useContext(MyContext)
    const {id}=props
    useEffect(() => {
        console.log(id)
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
        <div className="related">
            <h1 className="h-centered">Related Products</h1>
            <div className="related__Container">
                    {relatedProducts.map((product,index)=><ProductItem  key={index}   product={product}  cardSize="medium"/>)}
           </div>
        </div>
    )
}

export default Related
