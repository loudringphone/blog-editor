import React from 'react';
import { Card, CardHeader, Text, CardBody, Image, CardFooter, Button, ButtonGroup } from '@chakra-ui/react';
import { Timestamp } from "firebase/firestore";
import EditLineIcon from 'remixicon-react/EditLineIcon';
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon';
import { formatDate } from '../functions/formateDate';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import '../styles/card.css';
import { deletePost } from '../functions/deletePost';
import { toast } from "react-toastify"

const PostCard = ({ post, userEmail, myPosts, isUpdated }) => {
  let postDate
  if (post.date) {
    postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate());
  }
  const handleDelete = () => {
    if (!post.draft) {
      return alert('Please set the post back to draft before deleting it.')
    }
    const result = window.confirm('Are you sure to discard this post?')
    if (result) {
      deletePost(post.id)
      isUpdated(false)
      toast.success("Your draft has been successfully deleted.", {autoClose: 1500})
    }
  }
  return (
    <Card maxW='xs' margin='0'>
      <NavLink to={`/post/${post.id}`}>
        <CardHeader>
          <Image
            alignSelf='center'
            objectFit='cover'
            src={post.image}
            alt={post.preview}
          />
        </CardHeader>
        <CardBody>
          <span className="subtitle"> {post.label}</span>
          <Text>
            {post.title}
          </Text>
          <span className="date">{postDate}</span>
        </CardBody>
      </NavLink>
      <CardFooter
        justify={myPosts? 'space-evenly' : 'right'}
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <ButtonGroup className="card-buttons">
        { 
          myPosts ? (
            <motion.div whileTap={{ scale: 0.9 }} onClick={handleDelete}>
                <Button flex='1' variant='ghost' leftIcon={<DeleteBinLineIcon />}>
                  Delete
                </Button>
            </motion.div>
          ) : (
            <></>
          )
        }
        {
          userEmail && userEmail === post.email ? (
            <motion.div whileTap={{ scale: 0.9 }}>
              <NavLink to={`/edit/${post.id}`}>
                <Button flex='1' variant='ghost' leftIcon={<EditLineIcon />}>
                  Edit
                </Button>
              </NavLink>
            </motion.div>
          ) : (
            <></>
          )
        }
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
