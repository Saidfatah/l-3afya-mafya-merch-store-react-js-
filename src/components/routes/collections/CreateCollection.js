import React,{useContext,useState} from 'react'
import axios from 'axios'
import {H1,FlexWrap,FlexRow,SmallText,ButtonSecondary,Button,Input,Container,Success, Err,FlexCol} from '../../../Style/global'
/** @jsx jsx */
import { jsx,css } from '@emotion/core'
import {MyContext}  from '../../../Context/ProductsProvider'

const CreateCollection=()=> {
    const {products}= useContext(MyContext)
    const [productsIds, setproductsIds] = useState([])
    const [collectionTitle, setcollectionTitle] = useState("")
    const [errs,setErr]=useState({
        collectionTitle:false ,
        collectionTitleUsed:false ,
        productsReq:false,
        somethingWrong:false,
    })
    const [succes, setsucces] = useState(false)

    const resetValidaton = ()=>{
       setErr({
            collectionTitle:false ,
            productsReq:false,
            collectionTitleUsed:false ,
            somethingWrong:false
       })
    }
    const validate=()=>{
        let errsCount=0;
        const errsObjTemp ={...errs}

        if(productsIds.length<2)
        {
            errsCount++
            errsObjTemp.productsReq=true
        }
        if(collectionTitle == "")
        {
            errsCount++
            errsObjTemp.collectionTitle=true
        }

        setErr({...errsObjTemp})
        return errsCount>0 ? false :true
    }
    const submitCollection=async(e)=>{
        e.preventDefault()
        if(!validate()) return ; 
        resetValidaton();
        try {
             const newCollectionPromise= await axios.post('http://localhost:4000/collection/create',{title:collectionTitle,products:productsIds})
            if(newCollectionPromise.status != 200) throw new Error('SOMETHING_WENT_WRONG')
            setsucces(true)
        } catch (error) {
            console.log(error.response)
            if(error.message == "SOMETHING_WENT_WRONG" )
            { 
                 setErr({somethingWrong:true})
            }
            if(error.response.data == "TITLE_EXISTS" )
            { 
                 setErr({collectionTitleUsed:true})
            }
        }
    }

    const selectProduct=(id,add)=>{
        if(productsIds.indexOf(id) != -1) return ; 
        console.log({productsIds})
        let pIdsTemp = [...productsIds]
        if(add){
            pIdsTemp.push(id)
        }
        else {
            const Index= pIdsTemp.indexOf(id) 
            pIdsTemp.splice(Index,1)
        }
        console.log({productsIds})
        setproductsIds(pIdsTemp)
    }
    const OrderItem=({item,index})=>{
        return <div  css={styles.overview__item}>
           <FlexRow css={styles.item__identity}>
                <div  css={styles.item__image}>
                    <img src={'/images/products/'+item.title+'/'+item.images[0]} />
                </div>
                <FlexCol>
                <SmallText ><span>{item.title}</span></SmallText>
                {
                 productsIds.indexOf(item._id) == -1
                 ?<ButtonSecondary color="green" onClick={e=>selectProduct(item._id,true)}>
                         Add <i className="fas fa-plus-circle" ></i>
                 </ButtonSecondary>
                 :<ButtonSecondary  onClick={e=>selectProduct(item._id,false)}>
                         remove <i className="fas fa-minus-circle"></i>
                 </ButtonSecondary>

                }
                </FlexCol>
            </FlexRow>
        </div>
    }
    const ErrValidator = ({trigger,message})=>{
        if(!trigger)return null;
        return <Err>{message}</Err>
    }
    const SuccessValidator = ({trigger,message})=>{
        if(!trigger)return null;
        return <Success>{message}</Success>
    }
    return (
        <Container verticalCenter>
            <H1>Create New Collection</H1>
            <FlexCol width="500px" >
                <ErrValidator trigger={errs.collectionTitle} message="Collection Title Required" />
                <ErrValidator trigger={errs.collectionTitleUsed} message="Title already used" />
                <Input 
                     type="text" 
                     name="collectiontitle"
                     placeholder="Collection Title" 
                     onChange={e=>setcollectionTitle(e.target.value)} 
                     value={collectionTitle}
                />
                <ErrValidator trigger={errs.productsReq} message="Select 2 product at least " />
                <FlexWrap height="300px"  mgb={1} overflow={true}>
                    {products.map((p,i)=><OrderItem key={i} item={p} index={i} />)}
                </FlexWrap>
                <SuccessValidator trigger={succes} message="Collection Added with success"  />
                <ErrValidator trigger={errs.somethingWrong} message="Something went wrong try again latter " />
                <Button width="100%"  onClick={submitCollection} >SAVE COLLECTION</Button>
            </FlexCol>
        </Container>
    )
}

const styles ={
    order:css` 
    box-shadow: 0px 0px 10px 3px rgba(45, 55, 97, 0.2) ;
    margin-bottom:1rem;
    padding:1rem;
    `,
    overview__item :css` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:fit-content;
    max-width:300px;
    border-radius: 10px;
    padding:.25rem;
    border: 1px solid rgb(204, 204, 204);
    margin-bottom: .5rem;
    margin-right: .5rem;
    `,
    item__identity :css` 
    display: flex;
    align-content: center;
    align-items: center;
    `,
    item__image :css` 
    height: 65px;
    width: 65px;
    border-radius: 10px;
    border: 1px solid rgb(204, 204, 204);
    position: relative;
    margin-right:.5rem;
    img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 100%;
      }
    `,
    

}


export default CreateCollection
