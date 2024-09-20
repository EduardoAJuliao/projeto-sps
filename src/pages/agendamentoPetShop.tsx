import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

interface Agendamento {
  id: number;
  pet: string;
  dono: string;
  servico: string;
  horario: string;
}

const agendamentos: Agendamento[] = [
  { id: 1, pet: "Max", dono: "Luiz", servico: "Banho e Tosa", horario: "08:30" },
  { id: 2, pet: "Charlie", dono: "José", servico: "Vacinação", horario: "13:45" },
  { id: 3, pet: "Rocky", dono: "Luiz", servico: "Treinamento", horario: "18:00" },
];

const filtrarAgendamentos = (agendamentos: Agendamento[], periodo: string) => {
  return agendamentos.filter((agendamento) => {
    const hora = parseInt(agendamento.horario.split(":")[0]);
    switch (periodo) {
      case "manha":
        return hora >= 6 && hora < 12;
      case "tarde":
        return hora >= 12 && hora < 18;
      case "noite":
        return hora >= 18 || hora < 6;
      default:
        return false;
    }
  });
};

const getHorarioPeriodo = (periodo: string): string => {
  switch (periodo) {
    case "manha":
      return "06h-12h";
    case "tarde":
      return "12h-18h";
    case "noite":
      return "18h-06h";
    default:
      return "";
  }
};

const handleRemove = (id: number) => {
  alert(`Remover agendamento com ID: ${id}`);
};

export default function AgendaPetShop() {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

  const agendamentosManha = filtrarAgendamentos(agendamentos, "manha");
  const agendamentosTarde = filtrarAgendamentos(agendamentos, "tarde");
  const agendamentosNoite = filtrarAgendamentos(agendamentos, "noite");

  const renderizarAgendamentos = (agendamentos: Agendamento[]) => {
    return agendamentos.map((agendamento) => (
      <Card
        key={agendamento.id}
        style={{ marginBottom: "16px", width: "100%" }}
        onClick={() => {
          setSelectedAgendamento(agendamento);
          setOpen(true);
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold" style={{ flexShrink: 0, marginRight: "16px" }}>
              {agendamento.horario}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", marginRight: "16px" }}>
              <Typography variant="h6" fontWeight="bold">
                {agendamento.pet}
              </Typography>
              <Typography variant="h6" fontWeight="bold" style={{ marginLeft: "8px" }}>
                / {agendamento.dono}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {agendamento.servico}
              </Typography>
            </Box>
            <Button
              variant="text"
              color="inherit"
              onClick={(e) => {
                e.stopPropagation(); // Impede o clique no card ao clicar no botão
                handleRemove(agendamento.id);
              }}
            >
              Remover Agendamento
            </Button>
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const tema = createTheme({
    palette: {
      mode: temaEscuro ? "dark" : "light",
    },
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedAgendamento(null);
  };

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <img
                src="/images/LOGO-MUNDO-PETS.png"
                alt="Logo"
                style={{
                  height: "40px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Switch
              checked={temaEscuro}
              onChange={() => setTemaEscuro(!temaEscuro)}
              color="default"
            />
          </Toolbar>
        </AppBar>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          style={{
            color: temaEscuro ? "#fff" : "#000",
            marginTop: "20px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Agenda do Pet Shop
        </Typography>

        <Typography
          variant="body1"
          style={{ color: temaEscuro ? "#ccc" : "#555", fontSize: "0.875rem" }}
          gutterBottom
        >
          Visualize todos os agendamentos marcados e serviços.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card style={{ width: "100%", marginBottom: "16px" }}>
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">
                      <FontAwesomeIcon icon={faSun} /> Manhã
                    </Typography>
                    <Typography variant="subtitle1">
                      {getHorarioPeriodo("manha")}
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                {renderizarAgendamentos(agendamentosManha)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ width: "100%", marginBottom: "16px" }}>
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">
                      <FontAwesomeIcon icon={faSun} /> Tarde
                    </Typography>
                    <Typography variant="subtitle1">
                      {getHorarioPeriodo("tarde")}
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                {renderizarAgendamentos(agendamentosTarde)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ width: "100%", marginBottom: "16px" }}>
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">
                      <FontAwesomeIcon icon={faMoon} /> Noite
                    </Typography>
                    <Typography variant="subtitle1">
                      {getHorarioPeriodo("noite")}
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                {renderizarAgendamentos(agendamentosNoite)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Redirecionando para novo agendamento...")}
          >
            NOVO AGENDAMENTO
          </Button>
        </Box>

        {/* Modal para agendar */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Marcar Agendamento</DialogTitle>
          <DialogContent>
            {selectedAgendamento && (
              <>
                <Typography variant="h6">{selectedAgendamento.pet}</Typography>
                <Typography variant="body1">{selectedAgendamento.dono}</Typography>
                <Typography variant="body2">{selectedAgendamento.servico}</Typography>
                <TextField
                  margin="normal"
                  label="Horário"
                  defaultValue={selectedAgendamento.horario}
                  fullWidth
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => { /* Lógica para salvar agendamento */ handleClose(); }} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
