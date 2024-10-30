'use client'

import {
  Box,
 
} from '@chakra-ui/react'
import * as React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<LayoutProps> = (props) => {


  return (
    <Box>

    </Box>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout children>
    </DashboardLayout>
  )
}
