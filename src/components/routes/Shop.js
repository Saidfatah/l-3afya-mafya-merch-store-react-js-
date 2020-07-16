import React from 'react'
import ProductItem from '../Products/ProductItem'
function Shop() {
    const products=[
        {title:"Hands L",price:"$34",images:["img1.jpg","img2.jpg"]},
        {title:"skull T-Shirt",price:"$30",images:["img1.png","img2.png"]},
        {title:"skeleton T-Shirt",price:"$50",images:["img1.jpg","img2.jpg"]},
        {title:"skeleton hand T-Shirt",price:"$50",images:["img1.png","img2.png"]},
        {title:"mafya Dad Hat",price:"$50",images:["img1.png","img2.png"]},
        {title:"L'3afya mafya T-Shirt (red)",price:"$50",images:["img1.png","img2.png"]},
        {title:"L'3afya mafya T-Shirt (block)",price:"$50",images:["img1.png","img2.png"]},
        {title:"L'3afya mafya logo T-Shirt (red)",price:"$50",images:["img1.png","img2.png"]},
        {title:"L'3afya mafya logo T-Shirt (black)",price:"$50",images:["img1.png","img2.png"]},
        {title:"l3afya mafya Logo Hoodie (red)",price:"$50",images:["img1.png","img2.png"]},
        {title:"l3afya mafya Logo Hoodie (block)",price:"$50",images:["img1.png","img2.png"]},
        {title:"l'3afya mafya Lighter",price:"$50",images:["img1.png","img2.png"]},
    ]
    return (
        <div className="flex wrap">
            {
                products.map((product,index)=><ProductItem key={index} images={product.images} product={product} />)
            }
        </div>
    )
}

export default Shop
