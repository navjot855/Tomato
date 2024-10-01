import React,{useContext, useEffect} from 'react'
import  "./verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

const verify = () => {
    const [searchparams, setSearchParams] = useSearchParams();
    const success = searchparams.get('success');
    const orderid = searchparams.get('orderId');

    
    const {url,token} = useContext(storeContext);
    
    const navigate = useNavigate();
    const verifyPayment = async ()=>{
        const response = await fetch(`${url}/api/order/verify`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({success, orderid})
        });
        const result = await response.json();
        
        if(result.success){
            
            navigate("/myorders")
        }else{
            navigate("/");
        }

        
    };

    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default verify;
