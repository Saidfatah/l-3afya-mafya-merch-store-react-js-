import React from 'react'
import ProductItem from './ProductItem'
import {MyContext} from '../../Context/ProductsProvider'
function Products(props) {
    const {products,collections,getProductsByListOfIds} =React.useContext(MyContext)
    const {productSize,collectionTitle}=props

    let collection = collections.filter(collection=>collection.title == collectionTitle)
    console.log({collection})
    return (
        <div className="products">
            { collection.length>0 ? getProductsByListOfIds(collection.map(c=>c.products)).map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />):products.map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />)}
        </div>
    )
}

export default Products
