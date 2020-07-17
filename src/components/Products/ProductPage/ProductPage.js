import React from 'react'
import {useParams} from "react-router-dom";
import { isCompositeComponent } from 'react-dom/test-utils';
import AddToCart from './AddToCart'
import ProductImages from './ProductImages'
import RecentlyViewd from './RecentlyViewd'
import Related       from './Related'
function ProductPage(props) {
    const {id}= useParams()
    return (
        <div>
           product id is :  {id}
        </div>
    )
}

export default ProductPage
