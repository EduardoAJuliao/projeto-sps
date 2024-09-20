import React, { useState, ChangeEvent } from "react"
import {
  Container, Box, Typography, IconButton, Input, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField
} from "@mui/material"
import UploadIcon from '@mui/icons-material/UploadFile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import Papa, { ParseResult } from 'papaparse'

const ImportData: React.FC = () => {
  const [filterText, setFilterText] = useState("")
  const [data, setData] = useState<any[]>([]) // Tipo de dado a ser definido conforme sua necessidade
  const router = useRouter()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Processar CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<any>) => { // Tipar o resultado
          setData(result.data) // Ajuste conforme o tipo de dado esperado
        },
        error: (error: any) => { // Tipar o erro
          console.error("Erro ao processar o arquivo CSV:", error)
        }
      })
    }
  }

  const handleBack = () => {
    router.push("/dashboard") // Substitua com a rota de destino desejada
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  // Filtrar dados para exibição
  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <Container maxWidth="lg">
      <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          variant="outlined"
        >
          Voltar ao Menu
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Importar Dados
        </Typography>
        <label htmlFor="file-upload">
          <Input
            id="file-upload"
            type="file"
            inputProps={{ accept: ".csv" }}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <IconButton
            color="primary"
            component="span"
            aria-label="upload file"
            size="large"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <UploadIcon />
            <Typography variant="button" ml={1}>
              Importar Arquivo
            </Typography>
          </IconButton>
        </label>
      </Box>
      <Box mb={2} display="flex" justifyContent="flex-start">
        <TextField
          label="Filtrar por Nome"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={handleFilterChange}
        />
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>CEP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.zip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ImportData
