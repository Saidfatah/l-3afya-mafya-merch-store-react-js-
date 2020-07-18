import React ,{createContext,useState} from 'react'
import axios from 'axios'

export const MyContext =createContext()
function ProductsProvider(props) {
    let [products,setProducts]=React.useState(
        [
           {productId:0,title:"Hands L",price:"$34",images:["img1.jpg","img2.jpg"]},
           {productId:1,title:"skull T-Shirt",price:"$30",images:["img1.png","img2.png"]},
           {productId:2,title:"skeleton T-Shirt",price:"$50",images:["img1.jpg","img2.jpg"]},
           {productId:3,title:"skeleton hand T-Shirt",price:"$50",images:["img1.png","img2.png"]},
           {productId:4,title:"mafya Dad Hat",price:"$50",images:["img1.png","img2.png"]},
           {productId:5,title:"L'3afya mafya T-Shirt (red)",price:"$50",images:["img1.png","img2.png"]},
           {productId:6,title:"L'3afya mafya T-Shirt (block)",price:"$50",images:["img1.png","img2.png"]},
           {productId:7,title:"L'3afya mafya logo T-Shirt (red)",price:"$50",images:["img1.png","img2.png"]},
           {productId:8,title:"L'3afya mafya logo T-Shirt (black)",price:"$50",images:["img1.png","img2.png"]},
           {productId:9,title:"l3afya mafya Logo Hoodie (red)",price:"$50",images:["img1.png","img2.png"]},
           {productId:10,title:"l3afya mafya Logo Hoodie (block)",price:"$50",images:["img1.png","img2.png"]},
           {productId:11,title:"l'3afya mafya Lighter",price:"$50",images:["img1.png","img2.png"]},
        ]
     )
    let [collections,setCollections]=React.useState(
        [
           {title:"L'3AFYA MAFYA LOGO",products:[7,8,9,10,5,6]},
           {title:"New",products:[11,10,4,9,8]},
           {title:"skeleton",products:[0,1,2,3]},

        ]
     )
     let [update,setUpdate]=React.useState(false )
     let [loaded,setLoaded]=React.useState(false )
     let [taskToUpdate,setTaskToUpdate]=React.useState({} )
     
     const getProductById=id=>products.filter(p=>p.productId ==id)[0]


     const getImage=(title,callback,image)=>{
        axios.get('http://localhost:4000/images/'+image+'/'+title,
             {responseType: 'arraybuffer',headers: {'Accept': 'image/jpeg'}})
             .then(res=>{
                 console.log(callback(res))
                })
             .catch(err=>console.log(err))
     }
     

     return (
        <MyContext.Provider value={{products,collections,getProductById,getImage}}>
         {props.children}
        </MyContext.Provider>
     )
}

export default ProductsProvider
