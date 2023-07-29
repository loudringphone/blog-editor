import React, { useState } from 'react';
import { Stack, InputGroup, Input, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase_setup/firebase"
import MailLineIcon from 'remixicon-react/MailLineIcon';
import Key2LineIcon from 'remixicon-react/Key2LineIcon';
import { motion } from "framer-motion";
import '../styles/login.css'

const LoginComponent = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessageDisplay, setErrorMessageDisplay] = useState({display: "none"})
    const [errorIncorrectLoginDisplay, setErrorIncorrectLoginDisplay] = useState({display: "none"})
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessageDisplay({display: "none"})
        setErrorIncorrectLoginDisplay({display: "none"})
        console.log(email)
        console.log(password)

        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
          console.log(user.uid)
          navigate('/edit')
        } catch (error) {
            console.log(error)
            setErrorMessageDisplay({display: "block"})
            setErrorIncorrectLoginDisplay({display: "block"})
        }
              }
            
        

    return (

        
        <form  onSubmit={signIn} action="/home" id="customer_login">
            <div className="account-message-error" style={errorMessageDisplay}>
                <div className="errors">
                    <ul>
                        <li style={errorIncorrectLoginDisplay}>Incorrect email or password.</li>
                    </ul>
                </div>
            </div>
      <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
                <MailLineIcon color='grey' />
            </InputLeftElement>
            <Input 
                onChange={handleEmailInput}
                type='email'
                placeholder='Email address'
            />
        </InputGroup>
        <InputGroup size='md'>
          <InputLeftElement pointerEvents='none'>
            <Key2LineIcon color='grey' />
          </InputLeftElement>
          <Input
            onChange={handlePasswordInput}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='0.75rem' size='xs' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
      <motion.div whileTap={{scale: 0.9}}>
      <Button width='100%' marginTop='15px' type='submit' className="button" variant="primary">Sign in</Button>
      </motion.div>
      </form>
    )

}

export default LoginComponent;