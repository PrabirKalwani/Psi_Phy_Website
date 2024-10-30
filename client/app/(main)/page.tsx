'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiLayers,
  FiLock,
  FiSearch,
  FiUser,
  FiTrendingUp,
  FiTerminal,
  FiCpu,
  FiToggleLeft,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Features } from '#components/features'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Pricing } from '#components/pricing/pricing'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'




const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <HighlightsSection />

      <FaqSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
        <FallInPlace>
         Custom Content
         <Br/>
         That Actually Converts        </FallInPlace>

            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
  <Em> AI-powered social media content  </Em> that adapts to your audience and trends, boosting your online engagement.           </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Sign Up
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="#"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  Sign Up 
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/list.png"
                  width={1200}
                  height={762}
                  alt="Screenshot "
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Personalized Content',
            icon: FiUser,
            description: 'Content tailored to individual profiles for maximum engagement.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Trend-Based Creation',
            icon: FiTrendingUp,
            description: 'Leverages real-time trends to keep your content relevant and impactful.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'AI-Powered Automation',
            icon: FiCpu,
            description: 'Automates content generation using advanced AI, saving time and resources.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Scalable Solutions',
            icon: FiLayers,
            description: 'Create content at scale, from small businesses to large enterprises.',
            iconPosition: 'left',
            delay: 1.1,
          },
          
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Get Started">
        <VStack alignItems="flex-start" spacing="8">
        <Text color="muted" fontSize="xl">
  Get started for free with <Em>AI-powered content generation</Em>.
  Includes profile-based content recommendations, trend analysis, and automated post scheduling.
  Create engaging social media content effortlessly with user-specific data insights and optimization tools.
</Text>

        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
          We don&apos;t like to re-invent the wheel, neither should you. We
          selected the best Scripts and Hooks to train our AI models.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Martin Scorsese"
        description="An American Film Maker "
        avatar="/static/images/martin.webp"
        gradient={['pink.200', 'purple.500']}
      >
            The Most Important Thing is a script 
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your next idea two steps ahead"
      >
   <Text color="muted" fontSize="lg">
  We’ve built everything you need to create personalized, high-performing social media content, so you can focus on scaling your business and boosting engagement.
</Text>
<Wrap mt="8">
  {[
    'profile analysis',
    'trend detection',
    'content scheduling',
    'custom post templates',
    'AI content suggestions',
    'multi-platform support',
    'brand consistency',
    'performance tracking',
    'user engagement optimization',
    'hashtag recommendations',
    'audience segmentation',
    'real-time analytics',
    'scalable content generation',
    'cross-platform publishing',
    'visual content creation',
    'trend forecasting',
    'social media insights',
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home
