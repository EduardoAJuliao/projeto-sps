"use client"

import React, { useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material"

interface Item {
  id: number
  name: string
  description: string
  price: string
}

const DadosProdutos: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Produto A",
      description: "Esta é a descrição do Produto A",
      price: "19.99",
    },
    {
      id: 2,
      name: "Produto B",
      description: "Esta é a descrição do Produto B",
      price: "29.99",
    },
    {
      id: 3,
      name: "Produto C",
      description: "Esta é a descrição do Produto C",
      price: "39.99",
    },
  ])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [formData, setFormData] = useState<Pick<Item, "name" | "description" | "price">>({
    name: "",
    description: "",
    price: "0",
  })
  const [filterText, setFilterText] = useState("")

  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }

  const handleCreateItem = () => {
    setSelectedItem(null)
    setFormData({ name: "", description: "", price: "0" })
    setIsFormOpen(true)
  }

  const handleEditItem = (item: Item) => {
    setSelectedItem(item)
    setFormData({ ...item })
    setIsFormOpen(true)
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleSaveItem = () => {
    if (selectedItem) {
      setItems(items.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)))
    } else {
      setItems([...items, { id: items.length + 1, ...formData }])
    }
    setIsFormOpen(false)
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  )

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>Produtos</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <TextField label="Filtrar por nome..." variant="outlined" value={filterText} onChange={handleFilterChange} />
          <Button variant="contained" color="primary" onClick={handleCreateItem}>
            Criar Produto
          </Button>
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Button variant="outlined" onClick={handleBackToDashboard}>
          Voltar para Menu
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">R${parseFloat(item.price).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleEditItem(item)} style={{ marginRight: '8px' }}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteItem(item.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DialogTitle>{selectedItem ? "Editar Produto" : "Criar Produto"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            label="Preço"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveItem} color="primary" variant="contained">
            Salvar
          </Button>
          <Button onClick={() => setIsFormOpen(false)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default DadosProdutos
