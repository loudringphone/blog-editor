import React from 'react';
import PostList from '../components/PostList';

const Posts = ({currentUser, myPosts}) => {
   
    return (
        <section className='posts'>
            <PostList myPosts={myPosts} currentUser={currentUser} />
        </section>
    )

}

export default Posts;