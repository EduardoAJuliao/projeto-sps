import React from "react"
import { useRouter } from "next/navigation"
import {Container, Grid, Card, CardContent, Typography, Button, IconButton, Box} from "@mui/material"
import { Add as AddIcon, List as ListIcon} from "@mui/icons-material"
import PetsIcon from '@mui/icons-material/Pets';

const Dashboard: React.FC = () => {
  const router = useRouter()

  const handleNavigateTo = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <Container>
      <Box display="flex" justifyContent="flex-start" mb={2}>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" mb={2}>
                Cadastrar Parceiro
              </Typography>
              <Typography variant="body2" mb={2}>
                Crie novos parceiros de negócios através deste formulário.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleNavigateTo("/addParceiro")}
              >
                Ir para Cadastro
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" mb={2}>
                Pet Shop
              </Typography>
              <Typography variant="body2" mb={2}>
                Agende o horario do seu pet aqui.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PetsIcon />}
                onClick={() => handleNavigateTo("/agendamentoPetShop")}
              >
                Agendamento
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" mb={2}>
                Dados do Produto X Cadastro do Produto
              </Typography>
              <Typography variant="body2" mb={2}>
                Visualize e gerencie os dados dO produto.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ListIcon />}
                onClick={() => handleNavigateTo("/DadosProdutos")}
              >
                Ir para Dados
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
