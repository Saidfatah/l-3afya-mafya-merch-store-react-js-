import React ,{createContext,useState} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=React.useState(
        [
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
     )
     let [update,setUpdate]=React.useState(false )
     let [loaded,setLoaded]=React.useState(false )
     let [taskToUpdate,setTaskToUpdate]=React.useState({} )


     return (
        <MyContext.Provider value={{products,}}>
         {props.children}
        </MyContext.Provider>
     )
}

export default ProductsProvider
