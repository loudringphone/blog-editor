import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { db } from '../firebase_setup/firebase';
import { doc, getDoc } from "firebase/firestore";
import Header from '../components/header/Header';
import Routers from '../routers/Routers';
import useAuth from '../custom-hook/useAuth'
    

export const Layout = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const currentUser = useAuth()
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.email);
          const userSnapshot = await getDoc(userDocRef);
          const userData = userSnapshot.data();
          currentUser.name = userData.name;
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserData();
    }
  }, [currentUser])
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const {pathname} = useLocation()
  return (
    <>  
      {isDesktop ? (
        <meta name="viewport" content="width=1024, maximum-scale=1" />
      ) : (
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      )}
      {pathname === '/checkouts' ? (
        <></>
      ):(
        <Header currentUser={currentUser}/>
      )}
        <main>
          <Routers currentUser={currentUser}/>
        </main>
      
    </>
  )
}
