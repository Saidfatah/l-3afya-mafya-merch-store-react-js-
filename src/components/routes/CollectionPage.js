import React from 'react'
import { useParams } from 'react-router-dom'
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
function CollectionPage(props) {
    const {collectionTitle}= useParams()
    return (
        <div className="collectionPage">
            {collectionTitle}
            <Products collectionTitle={collectionTitle}/>
        </div>
    )
}

export default CollectionPage
