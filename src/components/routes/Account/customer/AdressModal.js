import React,{useState,useRef,useEffect} from 'react'
import {LightParagraph,FlexRow,Input,Modal,Button,ModalBackground} from '../../../../Style/global'
import AddressForm from './AddressForm'
import axios from 'axios'
import {getUser} from '../../../Auth/Auth'



const AdressModal=({isCreate,displayAddressModal,setdisplayAddressModal,setaddresses,addresses,addresToModify})=> {

    const modalRef = useRef()
    const modalShadowref = useRef()
    const [address, setaddress] = useState({
            firstName:'',
            lastName:'',
            company:'',
            phone:'', 
            address1:'',
            address2:'',
            city:'',
            country:'',
            zipcode:'',
            state:'',
            isDefault:false,
    })
    const apiurl=process.env.API_URL
    useEffect(() => {
        if(addresToModify != null) setaddress({...addresToModify})
        if(modalShadowref.current && displayAddressModal){
            modalShadowref.current.style.display='block'
            modalShadowref.current.style.opacity=1
            modalRef.current.style.opacity=1
        }
    }, [displayAddressModal,modalShadowref.current,addresToModify])
   

    const fadeOut=e=>{
        modalRef.current.style.opacity='0'
        modalShadowref.current.style.opacity='0'
        setTimeout(()=>{
            modalShadowref.current.style.display='none'
        }, 600);
        document.body.style.overflowY="scroll" 
        setdisplayAddressModal(false)
    }

    const updateUser=async (addresses)=>{
       try {
           const id =JSON.parse(getUser()).id
          const updateRespose =await axios.post(apiurl+'/users/update',{id,addresses})
          localStorage.setItem('token',updateRespose.data.token)
          localStorage.setItem('rule',updateRespose.data.rule)
          localStorage.setItem('user',JSON.stringify(updateRespose.data.user))
          window.location.reload();
       } catch (error) {
        console.log(error)
       }
    }

    const addAddress=()=>{
        let addressesTemp =[...addresses]
        if(address.isDefault == true )
        {
            console.log('default')
            addressesTemp= addressesTemp.map(add=>({...add,isDefault:false}))
            console.log(addressesTemp)
            addressesTemp.unshift({...address})
        }
        else{

            addressesTemp.push({...address})
        }
        updateUser(addressesTemp)
        setaddresses([...addressesTemp])
    }
    const modfiyAddress=()=>{
        let addressesTemp =[...addresses]
        if(address.isDefault == true )
        {
             addressesTemp= addressesTemp.map(add=>({...add,isDefault:false}))
             addressesTemp.splice(addresToModify.index-1,1)
             addressesTemp.unshift({...address})
        }
        else{
            if(addresToModify.isDefault)
            {
                if(addressesTemp.length==1){
                    addressesTemp[0].isDefault = true; 
                    return  setaddresses([...addressesTemp])
                }
                addressesTemp[1].isDefault = true; 
            }
            else {
                addressesTemp[addresToModify.index-1] = {...address}
            }
        }
        updateUser(addressesTemp)
        setaddresses([...addressesTemp])
    }

    
    return (
        <div>
            <ModalBackground ref={modalShadowref}  onClick={fadeOut}/>
            <Modal 
              ref={modalRef} 
              overflowY="scroll" 
              display={displayAddressModal?"flex":"none"} 
              height="95vh"
              padding={1} 
              center={true}
            >
                <LightParagraph  size={1.25} center={true} >Add new address</LightParagraph>
                <LightParagraph  center={true} >Please fill in the information below:</LightParagraph>
                <AddressForm {...{address,setaddres}} />
                {
                    addresToModify == null
                    ?<Button width="100%" onClick={addAddress} >ADD NEW ADDRESS</Button>
                    :<Button width="100%" onClick={modfiyAddress} >MODIFY ADDRESS</Button>
                }  
            </Modal>
        </div>
    )
}

export default AdressModal
