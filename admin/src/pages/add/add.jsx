import React ,{ useState } from 'react'
import './add.css'
import { assets} from '../../assets/assets';
import { toast } from 'react-toastify';



const add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description: "",
    price: "",
    category: "Salad"
  })

  const OnChangeHandler=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=> ({...data,[name]:value}))
  }

  const OnSubmitHandler = async(event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await fetch(`${url}/api/food/add`, {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    if(result.success){
      setData({
        name:"",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(result.message);
    }else{
      toast.error(result.message)
    }
  }

  return (
    <div className='add'>
      <form onSubmit={OnSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src={image?URL.createObjectURL(image):assets.upload_area} />
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={OnChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea name="description" onChange={OnChangeHandler} value={data.description} rows='6' placeholder='write content here' id="" required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product category</p>
            <select onChange={OnChangeHandler}  name='category'>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
            </div>
            <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={OnChangeHandler} value={data.price} required type="Number" name='price' placeholder='$20'/>
        </div>
        </div>
        
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default add
