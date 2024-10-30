'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import * as React from 'react'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Footer, FooterProps } from './footer'
import { Logo } from './logo'

interface LayoutProps {
  children: React.ReactNode
  footerProps?: FooterProps
}

export const DashboardLayout: React.FC<LayoutProps> = (props) => {
  const { children, footerProps } = props
  const ref = React.useRef<HTMLHeadingElement>(null)
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.on('change', () => setY(scrollY.get()))
  }, [scrollY])

  const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)')
  const { toggleColorMode } = useColorMode()

  // Handle Logout Functionality
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
  }

  return (
    <Box>
      <Box
        ref={ref}
        as="header"
        top="0"
        w="full"
        position="fixed"
        backdropFilter="blur(5px)"
        zIndex="sticky"
        borderColor="whiteAlpha.100"
        transitionProperty="common"
        transitionDuration="normal"
        bg={y > height ? bg : ''}
        boxShadow={y > height ? 'md' : ''}
        borderBottomWidth={y > height ? '1px' : ''}
        px={8}
        py={4}
      >
        <Container maxW="container.2xl">
          <Flex width="full" align="center" justify="space-between">
            <Logo
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            />
            <HStack spacing={4}>
              <Button onClick={toggleColorMode}>
                {useColorModeValue('Switch to Dark Mode', 'Switch to Light Mode')}
              </Button>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" position="relative" h="100vh" pt={20}> {/* Add padding to avoid overlap with header */}
        <BackgroundGradient height="100%" zIndex="-1" />
        <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
          <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center" justifyContent="center">
            <Button colorScheme="teal" mr={4}>
              User Persona
            </Button>
            <Button colorScheme="blue">
              Script Writer
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer {...footerProps} />
    </Box>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout children>
      {/* Additional content can go here if needed */}
    </DashboardLayout>
  )
}
