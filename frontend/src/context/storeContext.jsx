import { createContext,  useState,useEffect } from "react";
import { toast } from "react-toastify";
export const storeContext = createContext(null);

const storeContextProvider =(props) =>{

    const [cartItem, setCartItem] = useState({});
    const url ="http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    

    const fetchFoodList = async()=>{
        const response = await fetch(`${url}/api/food/listFood`,{method: "GET"});
        const result = await response.json();
        setFoodList(result.data);
        
        
        
    }
     
    
     
    const loadCartData = async(token) =>{
        const response = await fetch(`${url}/api/cart/get`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const result = await response.json();
        if(result.success){
            setCartItem(result.cartData);
        }else{
            toast.error("Error in loading the cart");
        }
    }
    useEffect(()=>{

        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
        
     },[])
    const  addToCart =  async(itemId)=>{
        if(!cartItem[itemId] ){
            
            setCartItem((prev) =>({...prev, [itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]: prev[itemId]+1}));
        }
        if(token){
            const response = await fetch(`${url}/api/cart/add`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemId: itemId
                })
            })
            const result = await response.json();
            if (result.success){
                toast.success("Added to cart");
            }else{
                toast.error("Error");
            }
        }
    }
    const removeFromCart = async(itemId) =>{
        setCartItem((prev) => {
            if (prev[itemId] === 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: prev[itemId] - 1 };
        })

        if(token){
            const response = await fetch(`${url}/api/cart/remove`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemId: itemId
                })
            })
            const result = await response.json();
            if (result.success){
                toast.success("removed from cart");
            }else{
                toast.error("Error");
            }
        }


    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        food_list.forEach((food)=>{
            const itemId = food.id;
            const quantityInCart = cartItem[itemId];
            if(quantityInCart){
                totalAmount += food.price * quantityInCart ;
            }
        })
        return totalAmount;
    }
    

    const contextValue = {
        food_list,cartItem,
        setCartItem,addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,setToken,token
    }

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default storeContextProvider;