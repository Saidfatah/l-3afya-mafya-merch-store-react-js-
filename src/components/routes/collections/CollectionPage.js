import React from 'react'
import { useParams } from 'react-router-dom'
import Products from '../../Products/Products'
import {H1} from '../../../Style/global'
/** @jsx jsx */
import { jsx } from '@emotion/core'

const CollectionPage=()=> {
    const {collectionTitle}= useParams()
    return (
        <div style={{marginTop:96}}>
            <H1>{collectionTitle} Collection</H1>
            <Products collectionTitle={collectionTitle}/>
        </div>
    )
}


export default CollectionPage
