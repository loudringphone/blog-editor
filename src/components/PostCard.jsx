import React from 'react'
import { Card, CardHeader, Flex, Box, Heading, Text, CardBody, Image,CardFooter, Button } from '@chakra-ui/react'
import EditLineIcon from 'remixicon-react/EditLineIcon';

const PostCard = () => {
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
    <Text>
      With Chakra UI, I wanted to sync the speed of development with 
    </Text>
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
    <Button flex='1' variant='ghost' leftIcon={<EditLineIcon />}>
      Edit
    </Button>
   
   
  </CardFooter>
</Card>
  )
}

export default PostCard