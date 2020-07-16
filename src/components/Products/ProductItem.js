import React,{useEffect,createRef} from 'react'
import axios from 'axios'
import img from '../../'
function ProductItem(props) {
    const img1 = React.createRef();
    const {title,price,images}=props.product

    React.useEffect(() => {
        axios.get('http://localhost:4000/images/'+title,{responseType: 'arraybuffer',
        headers: {
            'Accept': 'image/jpeg'
        }})
        .then(res=>{
          const blob = new Blob([res.data], { type:res.headers['content-type']});
          const objectURL = URL.createObjectURL(blob);
          console.log(objectURL);
          if (img1.current != null)
             img1.current.src = objectURL;
        })
        .catch(err=>console.log(err))
    }, []);

    return (
        <div className="card">
            <div className="card__image">
                <div className="card__image1">
                    <img ref={img1}  src=""alt=""/>
                </div>
                <div className="card__image2">
                    <img src={"../../Images/products/"+title+"/"+images[1]} alt=""/>
                </div>
            </div>
            <div className="card__info">
                <div className="card__title">{title}</div>
                <div className="card__price">{price}</div>
            </div>
            <div className="card__buttons">
                <button className="card_button ">addToCart</button>
                <button className="card_button ">More</button>
            </div>
     </div>
    )
}

export default ProductItem
