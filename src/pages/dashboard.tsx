import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/SideBar'
import { Box } from "@mui/material"

const DashboardPage: React.FC = () => {
  return(
  <Box sx={{ display: 'flex' }}>
  <Sidebar />
  <Box sx={{ flexGrow: 1, p: 3 }}>
    <Dashboard />;
  </Box>
</Box>)
};

export default DashboardPage;
