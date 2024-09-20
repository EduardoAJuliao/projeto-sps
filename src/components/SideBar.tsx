import React from "react"
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#121212', color: '#fff' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          gap: '16px',
        }}
      >
        <img src="/images/sps_logo.png" alt="Logo" style={{ width: 32, height: 32 }} />
        <Typography variant="h6" noWrap>
          Menu
        </Typography>
      </Box>

      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/addParceiro')}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Cadastrar Parceiro" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/DadosProdutos')}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Produtos" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/agendamentoPetShop')}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Pet Shop" />
        </ListItem>
        <Box sx={{ mt: 2 }}>
        </Box>
      </List>
      
    </Drawer>
  )
}

export default Sidebar
