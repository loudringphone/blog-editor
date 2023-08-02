import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import PostList from '../components/PostList';
import { motion } from "framer-motion";
import { Button } from '@chakra-ui/react'
import processing from '../assets/images/loading.gif'
import '../styles/posts.scss'

const Posts = ({currentUser, myPosts, home}) => {
    const {pathname} = useLocation();
    const [isLoaded, setIsLoaded] = useState(false)
    const loadingDone = (boolean) => {
      setIsLoaded(boolean)
    }

    if (pathname == '/' || pathname == '/home') {
      return (
        <>
        <section className='posts'>
       
            <PostList myPosts={myPosts} currentUser={currentUser} home={home} loadingDone={loadingDone} label='projects' />
        </section>
        <section className='posts'>
             
            <PostList myPosts={myPosts} currentUser={currentUser} home={home} loadingDone={loadingDone} label='articles' />
        </section>
        </>
        
      )
    }


    return (
        <section className='posts'>
            <PostList myPosts={myPosts} currentUser={currentUser} loadingDone={loadingDone} />
        </section>
    )

}

export default Posts;