import React from 'react'
import ProductItem from './ProductItem'
import {MyContext} from '../../Context/ProductsProvider'
function Products(props) {
    const {products} =React.useContext(MyContext)
    const {productSize}=props
    return (
        <div className="products">
            {
                products.map((product,index)=><ProductItem key={index} images={product.images} productSize={productSize} product={product} />)
            }
        </div>
    )
}

export default Products
