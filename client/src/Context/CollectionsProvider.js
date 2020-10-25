import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const CollectionsContext =createContext()
const CollectionsProvider=(props)=>{
    let [collections,setCollections]=useState([])
    const apiurl=process.env.API_URL

    useEffect(()=>{
        let source = axios.CancelToken.source();
        (async ()=>{
            try {
                axios.get(apiurl+'/collection',{cancelToken:source.token})
                .then(res=>setCollections(res.data))
                .catch(err=>console.log(err))
            } catch (error) {
                 if(axios.isCancel(error)) console.log('canceld request')
                 else throw error
            }
        })()

        return ()=>{ source.cancel()}

    },[])


    const addCollection=()=>{}
    const getCollections=() =>axios.get(apiurl+"collection")

    return (<CollectionsContext.Provider value={{collections,addCollection ,getCollections }}>
      {props.children}
     </CollectionsContext.Provider>)
}

export default CollectionsProvider
