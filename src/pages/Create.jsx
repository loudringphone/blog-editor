import { useEffect, useRef } from 'react';
import processing from '../assets/images/loading.gif'
import { createPost } from '../functions/createPost';
import { useNavigate } from "react-router-dom"

const Create = ({currentUser}) => {
  const navigate = useNavigate()
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      if (currentUser?.name) {
      isMountedRef.current = true;
      createPost(currentUser, navigate);
      }
    }
  }, [currentUser]);
    
    
  return (
    <section className='create'>
        <div className="processing">
            <img src={processing} alt="processing" style={{height: '18px'}}/>Creating new article...
        </div>
    </section>
  )

}

export default Create;