import React,{useState,useRef,useEffect} from 'react'
import {LightParagraph,FlexRow,Input,Modal,Button,ModalBackground} from '../../../../Style/global'
import Select from 'react-select'
import axios from 'axios'
import {getUser} from '../../../Auth/Auth'



const AdressModal=({isCreate,displayAddressModal,setdisplayAddressModal,setaddresses,addresses,addresToModify})=> {
    const country_list = ["Afghanistan","Albania","United States","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    const states_List=['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    const countriesOptions = country_list.map(country=>({value: country, label: country }))
    const statesOptions = states_List.map(state=>({value: state, label: state }))
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
    const [displaySatesSelect, setdisplaySatesSelect] = useState(false)
  
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
          const updateRespose =await axios.post('http://localhost:4000/users/update',{id,addresses})
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

    const selectCountry=e=>{
        setaddress({...address,country:e.value})
        setdisplaySatesSelect(e.value == "United States")
    }
    const selectState=e=>{
        console.log(e.values)
        setaddress({...address,state:e.value})
    }
    const handleChange=(field)=>(e)=>setaddress({...address,[field]:e.target.value})

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
                <Input 
                      type="text" 
                      name="firstName"
                      placeholder="First name" 
                      onChange={handleChange('firstName')} 
                      value={address.firstName}
                />
                <Input 
                      type="text" 
                      name="lastName"
                      placeholder="Last name" 
                      onChange={handleChange('lastName')} 
                      value={address.lastName}
                />
                <Input 
                      type="text" 
                      name="company"
                      placeholder="Company" 
                      onChange={handleChange('company')} 
                      value={address.company}
                />
                <Input 
                      type="text" 
                      name="phone"
                      placeholder="Phone" 
                      onChange={handleChange('phone')} 
                      value={address.phone}
                />
                <Input 
                      type="text" 
                      name="address1"
                      placeholder="Address1" 
                      onChange={handleChange('address1')} 
                      value={address.address1}
                />
                <Input 
                      type="text" 
                      name="address2"
                      placeholder="Address2" 
                      onChange={handleChange('address2')} 
                      value={address.address2}
                />
                <Input 
                      type="text" 
                      name="city"
                      placeholder="City" 
                      onChange={handleChange('city')} 
                      value={address.city}
                />
               <FlexRow>
                    <Select options={countriesOptions} onChange={selectCountry} menuPosition="absolute" menuPlacement="top"  maxMenuHeight="300px"/>                
                    <Input 
                      type="text" 
                      name="Zip code"
                      placeholder="zipcode" 
                      onChange={handleChange('zipcode')} 
                      value={address.zipcode}
                    />
                </FlexRow>
                {
                    displaySatesSelect
                    ?<Select options={statesOptions}  onChange={selectState} menuPosition="absolute" menuPlacement="top"  maxMenuHeight="300px" />
                    :null
                }
                <FlexRow mgb={0}>
                    <LightParagraph mgb={.5} center={true}>
                        set as default 
                        <Input 
                             type="checkbox" 
                             name="isDefault"
                             checked={address.isDefault}
                             onChange={e=>{
                                 console.log(e.target.value)
                                 setaddress({...address,isDefault:!address.isDefault})
                             }} 
                        />
                    </LightParagraph>
                </FlexRow>
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
