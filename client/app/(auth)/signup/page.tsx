'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useToast, // Import useToast for notifications
} from '@chakra-ui/react'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import * as React from 'react'
import type { NextPage } from 'next'
import { FallInPlace } from '#components/motion/fall-in-place'
import CryptoJS from 'crypto-js'
import { useRouter } from 'next/navigation'

const SignUpPage: NextPage = () => {
  return (
    <Box>
      <LoginForm />
    </Box>
  )
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const toast = useToast()
  const router = useRouter()

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      // Encrypt the password using CryptoJS
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString()

      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword, // Send encrypted password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Sign up successful!',
          description: 'Account created, please check your email for verification',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/dashboard') // Redirect user to the dashboard
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Something went wrong during sign up',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during sign up',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box position="relative" overflow="hidden" height="100vh">
      <BackgroundGradient height="100%" zIndex="-1" />

      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center" justifyContent="center">

          {/* This Box holds the sign-up form */}
          <FallInPlace delay={0.4}>
            <Box
              height="600px"
              position="relative"
              display="block"
              width={{ base: "90%", lg: "400px" }} // Set width for better centering
              margin="0 auto"
              zIndex="1"
            >
              <VStack
                spacing={8}
                bg="white"  // Light mode background
                color="black" // Light mode text color
                p={8}
                boxShadow="md"
                borderRadius="lg"
                width="100%"
                maxW="md"
                mx="auto"
                _dark={{
                  bg: 'gray.800',  // Dark mode background
                  color: 'white',   // Dark mode text color
                }}
              >
                <Heading size="lg">Sign Up</Heading>

                <Stack spacing={4} width="100%">
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      _dark={{ bg: 'gray.700', color: 'white', placeholder: { color: 'gray.400' } }} 
                    />
                  </FormControl>

                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      _dark={{ bg: 'gray.700', color: 'white', placeholder: { color: 'gray.400' } }} 
                    />
                  </FormControl>

                  <FormControl id="confirm-password">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input 
                      type="password" 
                      placeholder="Confirm your password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      _dark={{ bg: 'gray.700', color: 'white', placeholder: { color: 'gray.400' } }} 
                    />
                  </FormControl>

                  <Button 
                    backgroundColor="#7656d4" 
                    color="white" 
                    size="lg" 
                    width="100%"
                    onClick={handleSubmit}
                    _hover={{ backgroundColor: "#6a5cb5" }} // Darker shade on hover
                    _active={{ backgroundColor: "#5c4f99" }} // Even darker on active
                  >
                    Sign Up
                  </Button>
                </Stack>

                <Text>
                  Already have an account?{' '}
                  <Text as="span" color="#5c4f99" cursor="pointer">
                    Login
                  </Text>
                </Text>
              </VStack>
            </Box>
          </FallInPlace>

        </Stack>
      </Container>
    </Box>
  )
}

export default SignUpPage
