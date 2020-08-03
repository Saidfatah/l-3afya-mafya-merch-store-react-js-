import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const CollectionsContext =createContext()
function CollectionsProvider(props) {
    let [collections,setCollections]=useState([])
    const errhandler =err=>console.log(err)

    const apiurl='http://localhost:4000/'
    const apicall =(route,calb)=>axios.get(apiurl+route).then(res=>calb(res.data)).catch(errhandler)

    useEffect(()=>{
        apicall('collection',setCollections)
    },[collections.length>0])
    const addCollection=()=>{

    }
    const getCollections=() =>axios.get(apiurl+"collection")
    return (<CollectionsContext.Provider value={{collections,addCollection ,getCollections }}>
      {props.children}
     </CollectionsContext.Provider>)
}

export default CollectionsProvider
