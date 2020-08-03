import   React,{useContext,useEffect,useState} from 'react'
import   ProductItem from './ProductItem'
import   {MyContext} from '../../Context/ProductsProvider'
import   {CollectionsContext} from '../../Context/CollectionsProvider'
import   ImagesProvder from '../../Context/ImagesProvder'
function Products(props) {
    const {products,getProducts} =useContext(MyContext)
    const {getCollections} =useContext(CollectionsContext)
    const [collectionProducts,setCollectionProducts] =useState([])
    const [maxProducts,setMaxProducts] =useState([])
    const [allProducts,setAllProducts] =useState([])
    const {productSize,collectionTitle,maxDisplay,productsFromSearch}=props

    useEffect(()=>{
        getCollections().then(res=>{
            let collection = res.data.filter(collection=>collection.title == collectionTitle)
            collection.length>0 ?getCollectionProducts(collection) : maxDisplay != undefined ?getMaxDisplayProducts() : getAllProducts()
        })
    },[maxProducts.length>0,allProducts.length>0,collectionProducts.length>0])
    const getMaxDisplayProducts=()=>{
        if(maxDisplay != undefined) setMaxProducts(productsFromSearch.slice(1, 3 + 1)) 
    }
    const getCollectionProducts=(collection)=> {
          getProducts().then(res=>{
              const  ids= collection[0].products
              const collectionProdycts =  res.data.filter(p => ids.indexOf(p.productId) > -1)
              setCollectionProducts(collectionProdycts.map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />))
          })
    }
    const getAllProducts=()=>setAllProducts(products.map((product,index)=><ProductItem key={index}  productSize={productSize} product={product} />)) 

    return (
        <div className="products">
            <ImagesProvder>
                 {collectionProducts}
                 {maxProducts}
                 {allProducts}
            </ImagesProvder>
        </div>
    )
}

export default Products
