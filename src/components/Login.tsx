// src/components/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos.');
      }

      const data = await response.text();
      setShowWelcome(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundImage: 'url(/images/sps.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 0%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Evita rolagem
        position: 'relative',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        width="100%"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '90%',
            maxWidth: 225, // Ajuste a largura máxima do card
            minHeight: 200, // Ajuste a altura mínima do card
            margin: '0 auto', // Centraliza o card
            marginTop: -60, // Ajusta a posição do card mais acima na tela
            position: 'relative',
            zIndex: 1, // Garante que o card fique acima da imagem de fundo
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            SPS Group
          </Typography>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" textAlign="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </Box>
        {showWelcome && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(30, 58, 138, 0.7)" // Cor de fundo azul escuro com opacidade
            zIndex={1200}
            sx={{ transition: 'opacity 1s ease-in-out' }}
          >
            <Typography variant="h1" color="white">
              Bem-vindo!
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;
