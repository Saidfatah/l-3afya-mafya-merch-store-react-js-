import React ,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const ImagesContext =createContext()
function ImagesProvder(props) {
    const [image1,setImage1]= useState('')
    const [image2,setImage2]= useState('')
    const apiurl='http://localhost:4000/'

    useEffect(() => {
    }, [image2])


    const getImage = async(title)=> await axios.get(apiurl+'image/'+title)
    return (
   <ImagesContext.Provider value={{getImage,setImage1,setImage2}}>
         {props.children}
   </ImagesContext.Provider>)
}

export default ImagesProvder
