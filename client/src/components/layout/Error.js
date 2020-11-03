import React from 'react'
import {Err} from '../../Style/global'

const Error=({trigger,msg})=> {
     if(!trigger)return null
     return <Err >{msg  }</Err>
}

export default Error
