'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Progress,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  Radio,
  RadioGroup as ChakraRadioGroup,
  CheckboxGroup as ChakraCheckboxGroup,
  Checkbox,
  Input,
  Select,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackgroundGradient } from '#components/gradients/background-gradient'

const MotionBox = motion(Box)

type FormData = {
  targetAudience: string
  contentType: string[]
  primaryGoal: string
  platforms: string[]
  tone: string
  themes: string[]
  contentLength: string
  inspiration: string
  trends: string
  metrics: string[]
}

const initialFormData: FormData = {
  targetAudience: '',
  contentType: [],
  primaryGoal: '',
  platforms: [],
  tone: '',
  themes: [],
  contentLength: '',
  inspiration: '',
  trends: '',
  metrics: [],
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const totalSteps = 10

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  const handleNext = () => {
    if (step === totalSteps) {
      console.log('Form Summary:', formData)
      return
    }
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const questions = [
    {
      title: 'What is your target audience?',
      description: 'Demographics, interests, behaviors',
      component: (
        <Textarea
          value={formData.targetAudience}
          onChange={(e) => updateFormData('targetAudience', e.target.value)}
          placeholder="Describe your target audience..."
        />
      ),
    },
    {
      title: 'What type of content do you usually create or want to create?',
      description: 'Select all that apply',
      component: (
        <ChakraCheckboxGroup
          value={formData.contentType}
          onChange={(value) => updateFormData('contentType', value)}
        >
          <Stack spacing={3}>
            <Checkbox value="informative">Informative</Checkbox>
            <Checkbox value="entertaining">Entertaining</Checkbox>
            <Checkbox value="promotional">Promotional</Checkbox>
            <Checkbox value="educational">Educational</Checkbox>
            <Checkbox value="inspirational">Inspirational</Checkbox>
          </Stack>
        </ChakraCheckboxGroup>
      ),
    },
    {
      title: 'What is the primary goal of your social media content?',
      description: 'Choose your main objective',
      component: (
        <ChakraRadioGroup
          value={formData.primaryGoal}
          onChange={(value) => updateFormData('primaryGoal', value)}
        >
          <Stack spacing={3}>
            <Radio value="engagement">Engagement</Radio>
            <Radio value="brand-awareness">Brand Awareness</Radio>
            <Radio value="sales">Sales</Radio>
            <Radio value="community-building">Community Building</Radio>
          </Stack>
        </ChakraRadioGroup>
      ),
    },
    {
      title: 'Which platforms do you primarily use for your social media content?',
      description: 'Select all that apply',
      component: (
        <ChakraCheckboxGroup
          value={formData.platforms}
          onChange={(value) => updateFormData('platforms', value)}
        >
          <Stack spacing={3}>
            <Checkbox value="instagram">Instagram</Checkbox>
            <Checkbox value="twitter">Twitter</Checkbox>
            <Checkbox value="tiktok">TikTok</Checkbox>
            <Checkbox value="facebook">Facebook</Checkbox>
            <Checkbox value="linkedin">LinkedIn</Checkbox>
            <Checkbox value="youtube">YouTube</Checkbox>
          </Stack>
        </ChakraCheckboxGroup>
      ),
    },
    {
      title: 'What tone or style do you prefer for your scripts?',
      description: 'Choose your preferred tone',
      component: (
        <Select
          value={formData.tone}
          onChange={(e) => updateFormData('tone', e.target.value)}
          placeholder="Select tone"
        >
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="humorous">Humorous</option>
          <option value="inspirational">Inspirational</option>
          <option value="educational">Educational</option>
        </Select>
      ),
    },
    {
      title: 'Are there specific themes or topics you want to focus on?',
      description: 'Select all that apply',
      component: (
        <ChakraCheckboxGroup
          value={formData.themes}
          onChange={(value) => updateFormData('themes', value)}
        >
          <Stack spacing={3}>
            <Checkbox value="lifestyle">Lifestyle</Checkbox>
            <Checkbox value="technology">Technology</Checkbox>
            <Checkbox value="health">Health</Checkbox>
            <Checkbox value="travel">Travel</Checkbox>
            <Checkbox value="business">Business</Checkbox>
            <Checkbox value="entertainment">Entertainment</Checkbox>
          </Stack>
        </ChakraCheckboxGroup>
      ),
    },
    {
      title: 'What is the desired length of the scripts you need?',
      description: 'Choose your preferred content length',
      component: (
        <ChakraRadioGroup
          value={formData.contentLength}
          onChange={(value) => updateFormData('contentLength', value)}
        >
          <Stack spacing={3}>
            <Radio value="short">Short posts ({"< 1"} minute)</Radio>
            <Radio value="medium">Medium posts (1-3 minutes)</Radio>
            <Radio value="long">Long posts (3+ minutes)</Radio>
            <Radio value="mixed">Mixed lengths</Radio>
          </Stack>
        </ChakraRadioGroup>
      ),
    },
    {
      title: 'Can you provide examples of content or creators that inspire you?',
      description: 'To understand their aesthetic and messaging preferences',
      component: (
        <Textarea
          value={formData.inspiration}
          onChange={(e) => updateFormData('inspiration', e.target.value)}
          placeholder="Share some examples..."
        />
      ),
    },
    {
      title: 'What trends or current events do you want to incorporate into your content?',
      description: 'To ensure relevance and timeliness',
      component: (
        <Textarea
          value={formData.trends}
          onChange={(e) => updateFormData('trends', e.target.value)}
          placeholder="Describe relevant trends..."
        />
      ),
    },
    {
      title: 'How do you measure the success of your social media content?',
      description: 'Select all that apply',
      component: (
        <ChakraCheckboxGroup
          value={formData.metrics}
          onChange={(value) => updateFormData('metrics', value)}
        >
          <Stack spacing={3}>
            <Checkbox value="engagement">Engagement (likes, comments)</Checkbox>
            <Checkbox value="shares">Shares and Saves</Checkbox>
            <Checkbox value="reach">Reach and Impressions</Checkbox>
            <Checkbox value="conversion">Conversion Rates</Checkbox>
            <Checkbox value="followers">Follower Growth</Checkbox>
          </Stack>
        </ChakraCheckboxGroup>
      ),
    },
  ]

  return (
    <Box minH="100vh" position="relative">
      <BackgroundGradient />
      
      <Container maxW="container.md" py={20}>
        <Stack spacing={8} bg={bgColor} p={8} borderRadius="xl" boxShadow="xl">
          <Progress value={(step / totalSteps) * 100} size="sm" colorScheme="blue" borderRadius="full" />
          
          <AnimatePresence mode="wait">
            <MotionBox
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Stack spacing={6}>
                <Box>
                  <Heading size="lg" color={textColor} mb={2}>
                    {questions[step - 1].title}
                  </Heading>
                  <Text color="gray.500">
                    {questions[step - 1].description}
                  </Text>
                </Box>

                <FormControl>
                  {questions[step - 1].component}
                </FormControl>
              </Stack>
            </MotionBox>
          </AnimatePresence>

          <Stack direction="row" spacing={4} pt={4}>
            {step > 1 && (
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              colorScheme="blue"
              ml="auto"
            >
              {step === totalSteps ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}