import React,{useContext, useState} from 'react';
import './loginPopUp.css';
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/storeContext';

const loginPopUp = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Login");
    const {url,setToken,token} = useContext(storeContext);
    
    const [data,setData] = useState({
      name: "",
      email: "",
      password:""
    });
    const onChangeHandler=(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data, [name]:value}))
    }
    const onLogin = async (event)=>{
      event.preventDefault();
      let newUrl = url;
      if(currState ==="Login"){
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }
      const response = await fetch(newUrl,{
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      const result = await response.json();
      if(result.success){
        setToken(result.token);
        localStorage.setItem("token",result.token);
        setShowLogin(false);
      }
      else{
        alert(result.message);
      }
    }
    
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
        </div>
        <div className='login-popup-inputs'>
            {currState=== "Login" ?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required/>
        </div>
        <button type='submit'>{currState==="Sign up"? "Create Account": "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox"  required/>
            <p>By containing, i agree to terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?
        <p>Create a new accont? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
        : <p>Already have an accont? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        
        
      </form>
    </div>
  )
}

export default loginPopUp
