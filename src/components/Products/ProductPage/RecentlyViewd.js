import React,{useEffect,useContext,useState} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import cookie from 'js-cookie'
import {H1} from '../../../Style/global'
import Slider from '../../layout/Slider'


const RecentlyViewd=()=> {
     const {getProducts} =useContext(MyContext)
     const [RecentlyViewd, setRecentlyViewd] = useState([])
  
     useEffect(() => {
        let  recentlyViewIds =cookie.get('recentlyViewd')
        recentlyViewIds=JSON.parse(recentlyViewIds)
        getProducts().then(res=>{
            const recentlyVisted =  res.data.filter(p => recentlyViewIds.indexOf(p.productId) > -1)
            setRecentlyViewd(recentlyVisted)
        })
     }, [])


    return (
        <div>
            <H1 mgb={2}>Recently Viewd Products</H1>
            <Slider items={RecentlyViewd} />
        </div>
    )
}


export default RecentlyViewd


