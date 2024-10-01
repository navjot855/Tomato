import { React, useContext, useState} from 'react'
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

const navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState('Home');
    const {getTotalCartAmount,token,setToken} = useContext(storeContext);

    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/#app-download");
    }

    
  return (
    <div className="navbar">
        <Link to='/'><img src={assets.logo} className='logo'/></Link>
        <ul className="navbar-menu">
            <Link to='/' className={menu === "Home" ? "active": ""} onClick={()=> setMenu("Home")}>Home</Link>
            <a href='#explore-menu' className={menu === "Menu" ? "active": ""} onClick={()=> setMenu("Menu")}>Menu</a>
            <a href='#app-download' className={menu === "Mobile" ? "active": ""} onClick={()=> setMenu("Mobile")}>Mobile-app</a>
            <a href='#footer' className={menu === "Contacts" ? "active": ""} onClick={()=> setMenu("Contacts")}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount() === 0  ? "": "dot"}></div>
            </div>
        
        {!token?<button onClick={()=> setShowLogin(true)}>sign in</button>: 
        <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
            </ul>
            </div>}
            </div>
    </div>
  )
}

export default navbar