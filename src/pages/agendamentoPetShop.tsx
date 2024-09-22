import React, { useState } from "react";
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InputAdornment from "@mui/material/InputAdornment";

const manhaIcon = "/images/manhã.png";
const tardeIcon = "/images/tarde.png";
const noiteIcon = "/images/noite.png";
const calendarIcon = "/images/calendario.png";

interface Agendamento {
  id: number;
  pet: string;
  dono: string;
  servico: string;
  horario: string;
}

const agendamentos: Agendamento[] = [
  {
    id: 1,
    pet: "Max",
    dono: "Luiz",
    servico: "Banho e Tosa",
    horario: "08:30",
  },
  {
    id: 2,
    pet: "Charlie",
    dono: "José",
    servico: "Vacinação",
    horario: "13:45",
  },
  {
    id: 3,
    pet: "Rocky",
    dono: "Luiz",
    servico: "Treinamento",
    horario: "18:00",
  },
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
const getHorarioPeriodo = (periodo: string): JSX.Element => {
  let horario;
  switch (periodo) {
    case "manha":
      horario = "06h-12h";
      break;
    case "tarde":
      horario = "12h-18h";
      break;
    case "noite":
      horario = "18h-06h";
      break;
    default:
      horario = "";
  }

  return (
    <Typography
      variant="subtitle1"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: "bold",
        fontSize: "20px",
        color: "#888",
      }}
    >
      {horario}
    </Typography>
  );
};

export default function AgendaPetShop() {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [open, setOpen] = useState(false);
  const [isNovoAgendamento, setIsNovoAgendamento] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false); // Novo estado para controlar o DatePicker

  const agendamentosManha = filtrarAgendamentos(agendamentos, "manha");
  const agendamentosTarde = filtrarAgendamentos(agendamentos, "tarde");
  const agendamentosNoite = filtrarAgendamentos(agendamentos, "noite");

  const tema = createTheme({
    palette: {
      mode: temaEscuro ? "dark" : "light",
    },
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedAgendamento(null);
  };

  const handleRemove = (id: number) => {
    alert(`Remover agendamento com ID: ${id}`);
  };

  const abrirNovoAgendamento = () => {
    setSelectedAgendamento(null);
    setIsNovoAgendamento(true);
    setOpen(true);
  };

  const renderizarAgendamentos = (agendamentos: Agendamento[]) => {
    return agendamentos.map((agendamento) => (
      <Card
        key={agendamento.id}
        style={{ marginBottom: "16px", width: "100%" }}
        onClick={() => {
          setSelectedAgendamento(agendamento);
          setIsNovoAgendamento(false);
          setOpen(true);
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              style={{
                flexShrink: 0,
                marginRight: "16px",
                fontSize: "0.9rem", // Diminuindo o tamanho da fonte
                fontFamily: "Inter, sans-serif", // Aplicando a fonte Inter
              }}
            >
              {agendamento.horario}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "16px",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.9rem", // Diminuindo o tamanho da fonte
                  fontFamily: "Inter, sans-serif", // Aplicando a fonte Inter
                }}
              >
                {agendamento.pet}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                style={{
                  color: "#888",
                  marginLeft: "8px",
                  fontSize: "0.9rem", // Diminuindo o tamanho da fonte
                  fontFamily: "Inter, sans-serif", // Aplicando a fonte Inter
                }}
              >
                / {agendamento.dono}
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                style={{
                  color: "#888",
                  fontSize: "0.9rem", // Diminuindo o tamanho da fonte
                  fontFamily: "Inter, sans-serif", // Aplicando a fonte Inter
                }}
              >
                {agendamento.servico}
              </Typography>
            </Box>
            <Button
              variant="text"
              color="inherit"
              style={{
                fontSize: "0.9rem", // Diminuindo o tamanho da fonte do botão
                fontFamily: "Inter, sans-serif", // Aplicando a fonte Inter ao botão
                color: "#888",
              }}
              onClick={(e) => {
                e.stopPropagation();
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

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <div
        style={{
          backgroundColor: "rgba(62, 60, 65, 0.5)",
          width: "150px",
          padding: "4px",
          borderRadius: "3px",
        }}
      >
        <img
          src="/images/LOGO-MUNDO-PETS.png"
          alt="Logo"
          style={{
            height: "40px",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <Container maxWidth="lg" style={{ marginTop: "1px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          style={{
            color: temaEscuro ? "#fff" : "#000",
            marginTop: "40px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Agenda do Pet Shop
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              open={datePickerOpen} // Usa o novo estado
              onOpen={() => setDatePickerOpen(true)} // Abre o DatePicker
              onClose={() => setDatePickerOpen(false)} // Fecha o DatePicker
              slotProps={{
                textField: {
                  InputProps: {
                    startAdornment: (
                      <IconButton>
                        <img
                          src={calendarIcon}
                          alt="Calendário"
                          style={{ width: "30px" }} // Ajuste o tamanho conforme necessário
                        />
                      </IconButton>
                    ),
                    endAdornment: (
                      <IconButton onClick={() => setDatePickerOpen(true)}>
                        <ArrowDropDownIcon />
                      </IconButton>
                    ),
                  },
                  sx: {
                    width: "200px",
                    marginLeft: "610px",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Typography>

        <Typography
          variant="body1"
          style={{
            color: "#888",
            fontSize: "18px",
            fontFamily: "Inter, sans-serif",
            marginTop: "-20px",
          }}
          gutterBottom
        >
          Visualize todos os agendamentos marcados e serviços.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <CardHeader
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={manhaIcon}
                      alt="Manhã"
                      style={{ width: "24px", marginRight: "8px" }}
                    />
                    {getHorarioPeriodo("manha")}
                  </div>
                }
              />
              <CardContent>
                {renderizarAgendamentos(agendamentosManha)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <CardHeader
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={tardeIcon}
                      alt="Tarde"
                      style={{ width: "24px", marginRight: "8px" }}
                    />
                    {getHorarioPeriodo("tarde")}
                  </div>
                }
              />
              <CardContent>
                {renderizarAgendamentos(agendamentosTarde)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <CardHeader
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={noiteIcon}
                      alt="Noite"
                      style={{ width: "24px", marginRight: "8px" }}
                    />
                    {getHorarioPeriodo("noite")}
                  </div>
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
            onClick={abrirNovoAgendamento} // Chama a função para abrir o modal de "Novo Agendamento"
            style={{
              backgroundColor: "#9289FA", // Cor do fundo
              color: "black", // Cor do texto
              borderRadius: "8px", // Bordas arredondadas
              padding: "10px 20px", // Aumenta o tamanho do botão
              fontSize: "16px", // Aumenta o tamanho do texto
              fontWeight: "bold", // Texto em negrito
            }}
          >
            NOVO AGENDAMENTO
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              borderRadius: "16px", //borda do modal
            },
          }}
        >
          <DialogTitle
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {isNovoAgendamento ? "Agende um Atendimento" : "Editar Agendamento"}
          </DialogTitle>
          <Typography
            variant="body2"
            style={{ padding: "0 25px", color: "#888" }}
          >
            Preencha as informações abaixo para agendar um novo serviço.
          </Typography>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              Nome do Tutor
            </Typography>
            <TextField
              defaultValue={selectedAgendamento?.dono}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Nome do Pet
            </Typography>
            <TextField
              defaultValue={selectedAgendamento?.pet}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PetsIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Telefone
            </Typography>
            <TextField
              type="tel" // Define o tipo como telefone
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Descrição do serviço
            </Typography>
            <TextField
              defaultValue={selectedAgendamento?.servico}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Data
                </Typography>
                <TextField
                  defaultValue={selectedAgendamento?.horario}
                  type="date" // Define o tipo como date
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Hora
                </Typography>
                <TextField
                  fullWidth
                  type="time" // Define o tipo como time
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#9289FA",
                color: "black",
                borderRadius: "8px", // Bordas arredondadas
                padding: "10px 20px", // Aumenta o tamanho do botão
                fontSize: "16px", // Aumenta o tamanho do texto
                fontWeight: "bold", // Texto em negrito
              }}
            >
              Agendar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
