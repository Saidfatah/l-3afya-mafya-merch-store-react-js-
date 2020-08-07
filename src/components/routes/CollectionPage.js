import React from 'react'
import { useParams } from 'react-router-dom'
import Products from '../Products/Products'
function CollectionPage() {
    const {collectionTitle}= useParams()
    return (
        <div className="collectionPage mgt6">
            <h1 className="h-centered ">{collectionTitle} Collection</h1>
               <Products collectionTitle={collectionTitle}/>
        </div>
    )
}

export default CollectionPage
