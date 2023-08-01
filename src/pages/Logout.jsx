import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../firebase_setup/firebase"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import useAuth from '../custom-hook/useAuth'
import processing from '../assets/images/loading.gif'
const Logout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = useAuth()
    const [isLogout, setIsLogout] = useState(false)
    useEffect(() => {
        const logout = async () => {
          try {
            await signOut(auth).then(() => {
              toast.dismiss();
              toast.success("Successfully logged out.", { autoClose: 1500 });
            }).catch(error => {
              console.log(error.message);
            });
          } catch (error) {
            console.log(error.message);
          }
          
          if (pathname === "/account/logout") {
            navigate('/');
          }
        };
    
        if (currentUser != null) {
          logout();
        } else {
          navigate('/');
        }
      }, [currentUser, navigate, pathname]);
    
    return (
        <section className='logout'>
          <div className="processing">
            <img src={processing} alt="processing" style={{height: '30px'}}/>
            Securely logging you out...
          </div>
        </section>
    )

}

export default Logout;