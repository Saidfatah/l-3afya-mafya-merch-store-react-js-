import React,{useEffect,useContext,useState,recentlyViewd, createRef} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import ProductItem from '../ProductItem'
import cookie from 'js-cookie'
import {easer} from '../../utils/funcs1'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
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

const styles ={
    recentlyViewd :css` 
    width:100%;
    padding:2rem 4rem;
    margin-bottom: 3rem;

    >div{
        position: relative;
        width:100%;
        height: 420px;
        overflow: hidden;
    }
    `,
    stories__btn :css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    :focus{
        outline: none;
    }
    `,
    btn_left :css`left:2%;`,
    btn_right:css`right:2%;`,
    btn__image:css` 
    background-image: url("https://instagram.com/static/bundles/es6/sprite_glyphs_03eea17932ef.png/03eea17932ef.png");
    background-repeat: no-repeat;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    `,
    image_left:css` background-position: -185px -226px;`,
    image_right:css` background-position: -232px -226px;`,
    recentlyViewd__Container:css`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    height: 80%;
    width: fit-content;
    transition: all .3s ease-out;
    `, 
}
export default RecentlyViewd


