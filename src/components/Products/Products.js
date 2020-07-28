import React,{useContext} from 'react'
import ProductItem from './ProductItem'
import {MyContext} from '../../Context/ProductsProvider'
import {CollectionsContext} from '../../Context/CollectionsProvider'
import ImagesProvder from '../../Context/ImagesProvder'
function Products(props) {
    const {products,getProductsByListOfIds} =useContext(MyContext)
    const {collections} =useContext(CollectionsContext)
    const {productSize,collectionTitle,maxDisplay,productsFromSearch}=props

    let collection = collections.filter(collection=>collection.title == collectionTitle)
    const getMaxDisplayProducts=()=>{
        console.log('from searhc')
        if(maxDisplay != undefined)
             return productsFromSearch.slice(1, 3 + 1)
    }
    const getProductsListByIds=()=>{
        console.log('fromrecently ')
        return getProductsByListOfIds(collection.map(c=>c.products)).map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />)
    }
    const getAllProducts=()=>{
        console.log('from shop')
        return products.map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />)
    }

    return (
        <div className="products">
            <ImagesProvder>
                 { collection.length>0 ?getProductsListByIds() : maxDisplay != undefined ?getMaxDisplayProducts() : getAllProducts()}
            </ImagesProvder>
        </div>
    )
}

export default Products
