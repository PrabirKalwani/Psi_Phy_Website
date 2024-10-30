'use client'

import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { DashboardLayout } from '#components/layout/DashboardLayout'

const Dashboard: NextPage = () => {
  const handleLogout = () => {
    console.log('Logging out...')
  }

  return (
    <DashboardLayout >
      <Box>
      </Box>
    </DashboardLayout>
  )
}

export default Dashboard
