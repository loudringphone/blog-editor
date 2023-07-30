import { Card, CardHeader, Text, CardBody, Image,CardFooter, Button } from '@chakra-ui/react'
import { Timestamp } from "firebase/firestore";
import EditLineIcon from 'remixicon-react/EditLineIcon';
import { formatDate } from '../functions/formateDate';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

import '../styles/card.css'
const PostCard = (props) => {
  const {post} = props
  const postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate())

  console.log(postDate)
  return (
    <Card maxW='xs' margin='0'>
  <CardHeader>
  <Image
    alignSelf='center'
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  />
   
  </CardHeader>
  <CardBody>
    <span className="subtitle"> {post.subtitle}</span>
    <Text>
      {post.preview}
    </Text>
    <span className="date">{postDate}</span>
  </CardBody>
  

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <motion.div whileTap={{scale: 0.9}}>
    <NavLink to={`/edit/${post.id}`}>
    <Button flex='1' variant='ghost' leftIcon={<EditLineIcon />}>
      Edit
    </Button>
    </NavLink>
    </motion.div>


   
   
  </CardFooter>
</Card>
  )
}

export default PostCard