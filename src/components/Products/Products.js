import React from 'react'
import ProductItem from './ProductItem'
import {MyContext} from '../../Context/ProductsProvider'
function Products(props) {
    const {products} =React.useContext(MyContext)
    return (
        <div className="flex wrap">
            {
                products.map((product,index)=><ProductItem key={index} images={product.images} product={product} />)
            }
        </div>
    )
}

export default Products
