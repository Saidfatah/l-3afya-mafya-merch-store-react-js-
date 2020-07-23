import React from 'react'
import ProductItem from './ProductItem'
import {MyContext} from '../../Context/ProductsProvider'
function Products(props) {
    const {products,collections,getProductsByListOfIds} =React.useContext(MyContext)
    const {productSize,collectionTitle,maxDisplay,productsFromSearch}=props

    let collection = collections.filter(collection=>collection.title == collectionTitle)
    console.log({collection})
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
            { collection.length>0 ?getProductsListByIds() : maxDisplay != undefined ?getMaxDisplayProducts() : getAllProducts()}
        </div>
    )
}

export default Products
