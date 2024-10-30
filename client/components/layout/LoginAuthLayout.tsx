'use client'

import { Box, AbsoluteCenter, SkipNavContent, SkipNavLink } from '@chakra-ui/react'
import { ReactNode } from 'react'
import {
  AnnouncementBanner,
  AnnouncementBannerProps,
} from '../announcement-banner'
import { Footer, FooterProps } from './footer'
import { Header, HeaderProps } from './header'

interface LayoutProps {
  children: ReactNode
  announcementProps?: AnnouncementBannerProps
  headerProps?: HeaderProps
  footerProps?: FooterProps
}

export const LoginAuthLayout: React.FC<LayoutProps> = (props) => {
  const { children, announcementProps, headerProps, footerProps } = props
  return (
    <Box>
      <Header {...headerProps} />
      <Box as="main" position="relative" h="100vh">
          {children}
      </Box>
      <Footer {...footerProps} />
    </Box>
  )
}
