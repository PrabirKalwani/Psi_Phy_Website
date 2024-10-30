'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Logo } from '#components/layout/logo'

// Wrap Chakra components with motion
const MotionBox = motion(Box)
const MotionCard = motion(Card)
const MotionFlex = motion(Flex)

export default function Page() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { scrollY } = useScroll()
  
  // Dynamic color values for light/dark mode
  const cardBg = useColorModeValue('white', 'gray.800')
  const softBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const descriptionColor = useColorModeValue('gray.600', 'gray.400')
  
  // Gradient colors for different modes
  const gradientText = useColorModeValue(
    'linear(to-r, blue.400, blue.600)',
    'linear(to-r, blue.200, blue.400)'
  )

  // Scroll-based animations
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerY = useTransform(scrollY, [0, 100], [0, -20])

  // Card hover animation
  const cardHoverAnimation = {
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    },
    tap: {
      y: -4,
      transition: { duration: 0.1 }
    }
  }

  return (
    <Box minH="100vh" position="relative">
      <BackgroundGradient />
      
      {/* Navbar */}
      <MotionFlex
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        backdropFilter="blur(8px)"
        px={8}
        py={4}
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Logo />
            <IconButton
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Flex>
        </Container>
      </MotionFlex>

      <Box pt={24} pb={12}>
        <Container maxW="container.xl">
          {/* Hero Section */}
          <MotionBox
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              letterSpacing="tight"
            >
              Everything you need to{' '}
              <Box
                as="span"
                bgGradient={gradientText}
                bgClip="text"
              >
                go viral
              </Box>
            </Heading>
          </MotionBox>

          {/* Top Features Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={6}
            mb={8}
          >
            {[
              {
                title: 'Daily Ideas',
                description: 'Daily proven ideas inspired by viral content',
                image: '/placeholder.svg?height=150&width=250'
              },
              {
                title: 'SEO Captions',
                description: 'SEO optimized captions for TikTok, Instagram & YouTube',
                image: '/placeholder.svg?height=150&width=250'
              },
              {
                title: 'Catchy Hooks',
                description: 'Fine tuned viral hooks to make people stop scrolling',
                image: '/placeholder.svg?height=150&width=250'
              },
              {
                title: 'Competitor Tracker',
                description: "Get notified when your competitor's post goes viral",
                image: '/placeholder.svg?height=150&width=250'
              }
            ].map((feature, index) => (
              <MotionCard
                key={feature.title}
                bg={cardBg}
                boxShadow="sm"
                cursor="pointer"
                variants={cardHoverAnimation}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => console.log(`Clicked ${feature.title}`)}
              >
                <CardHeader>
                  <Heading size="md" color={textColor}>{feature.title}</Heading>
                  <Text color={descriptionColor} fontSize="sm">
                    {feature.description}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Box bg={softBg} p={4} borderRadius="lg">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={250}
                      height={150}
                      style={{ width: '100%', borderRadius: '0.5rem' }}
                    />
                  </Box>
                </CardBody>
              </MotionCard>
            ))}
          </Grid>

          {/* Bottom Features Grid */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            {/* Profile Analyst Card */}
            <MotionCard
              bg={cardBg}
              boxShadow="sm"
              cursor="pointer"
              variants={cardHoverAnimation}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => console.log('Clicked Profile Analyst')}
            >
              <CardHeader>
                <Heading size="md" color={textColor}>Profile Analyst</Heading>
                <Text color={descriptionColor} fontSize="sm">
                  Analyze any Instagram account to find top and worst-performing posts
                </Text>
              </CardHeader>
              <CardBody>
                <Box bg={softBg} p={6} borderRadius="lg">
                  <Stack spacing={4}>
                    <Input placeholder="Enter username" bg={cardBg} />
                    <Button colorScheme="blue" width="full">
                      Analyze
                    </Button>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      {['Engagement', 'Reach', 'Growth'].map((item) => (
                        <Box
                          key={item}
                          p={4}
                          bg={cardBg}
                          borderRadius="lg"
                          textAlign="center"
                        >
                          <Text fontSize="sm" fontWeight="medium" color={textColor}>
                            {item}
                          </Text>
                        </Box>
                      ))}
                    </Grid>
                  </Stack>
                </Box>
              </CardBody>
            </MotionCard>

            {/* Auto Ideation Card */}
            <MotionCard
              bg={cardBg}
              boxShadow="sm"
              cursor="pointer"
              variants={cardHoverAnimation}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => console.log('Clicked Auto Ideation')}
            >
              <CardHeader>
                <Heading size="md" color={textColor}>Auto Ideation</Heading>
                <Text color={descriptionColor} fontSize="sm">
                  Generate up to 100 content ideas with a click based on viral content pieces
                </Text>
              </CardHeader>
              <CardBody>
                <Box bg={softBg} p={6} borderRadius="lg">
                  <Stack spacing={4}>
                    {['Hot Topics', 'Audience Frustrations', 'Content Format'].map((item) => (
                      <Flex
                        key={item}
                        justify="space-between"
                        align="center"
                        p={3}
                        bg={cardBg}
                        borderRadius="lg"
                      >
                        <Text fontWeight="medium" color={textColor}>
                          {item}
                        </Text>
                        <Text color={descriptionColor}>▼</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              </CardBody>
            </MotionCard>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}