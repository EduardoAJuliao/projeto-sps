import React from 'react'
import Sidebar from './SideBar'
import { Box } from '@mui/material'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
