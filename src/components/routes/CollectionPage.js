import React from 'react'
import { useParams } from 'react-router-dom'
import Products from '../Products/Products'
function CollectionPage() {
    const {collectionTitle}= useParams()
    return (
        <div className="collectionPage">
            <h1>{collectionTitle} Collection</h1>
               <Products collectionTitle={collectionTitle}/>
        </div>
    )
}

export default CollectionPage
