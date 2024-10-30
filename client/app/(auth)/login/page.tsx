'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie' // Import js-cookie to handle cookies
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
  useToast,
} from '@chakra-ui/react'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import * as React from 'react'
import { FallInPlace } from '#components/motion/fall-in-place'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const toast = useToast()

  // Clear all cookies when the component loads
  useEffect(() => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName)
    })
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Encrypt the password before sending it to the server
      const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY as string).toString()

      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword, // Send encrypted password to server
        }),
      })

      const data = await res.json()

      if (res.ok) {
        const { accessToken } = data.userCredential.user.stsTokenManager

        // Set new access token in cookies
        Cookies.set('access_token', accessToken, { expires: 1 })

        router.push('/dashboard')

        toast({
          title: 'Logged in successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        setError(data.message || 'Login failed')
        toast({
          title: 'Error logging in',
          description: data.message || 'Invalid credentials',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      setError('Something went wrong')
      toast({
        title: 'Error',
        description: 'An error occurred during login',
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
          <FallInPlace delay={0.4}>
            <Box
              height="600px"
              position="relative"
              display="block"
              width={{ base: '90%', lg: '400px' }}
              margin="0 auto"
              zIndex="1"
            >
              <VStack
                spacing={8}
                bg="white"
                color="black"
                p={8}
                boxShadow="md"
                borderRadius="lg"
                width="100%"
                maxW="md"
                mx="auto"
                _dark={{
                  bg: 'gray.800',
                  color: 'white',
                }}
              >
                <Heading size="lg">Login</Heading>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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

                    {error && <Text color="red.500">{error}</Text>}

                    <Button
                      type="submit"
                      backgroundColor="#7656d4"
                      color="white"
                      size="lg"
                      width="100%"
                      _hover={{ backgroundColor: '#6a5cb5' }}
                      _active={{ backgroundColor: '#5c4f99' }}
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
                <Text>
                  Don't have an account?{' '}
                  <Text as="span" color="#5c4f99" cursor="pointer">
                    Sign Up
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

export default LoginForm
