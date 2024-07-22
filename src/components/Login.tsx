import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface LoginProps {
  title: string;
  backgroundImage: string;
}

const Login: React.FC<LoginProps> = ({ title, backgroundImage }) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Informe o Usuário e Senha');
      return;
    }

    sessionStorage.setItem('token', '');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos.');
      }

      const data = await response.json();

      if (username === 'ConfigSPS') {
        const check = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conf/checkConfigLogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const checkData = await check.json();

        if (checkData.isConfigLogin) {
          sessionStorage.setItem('token', 'config');
          router.push('/configsps');
          return;
        }
      }

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
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        transition: 'opacity 2s ease-in-out',
        opacity: isPageLoaded ? 1 : 0,
      }}
    >
      {/* Overlay para o efeito de desfoque azul */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 128, 0.2)', // Reduzi a opacidade do azul
          backdropFilter: 'blur(8px)',
          zIndex: 0,
          transition: 'opacity 2s ease-in-out',
          opacity: isPageLoaded ? 1 : 0,
        }}
      />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
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
            maxWidth: 225,
            minHeight: 200,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            marginTop: -60,
          }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontFamily: '"Roboto", sans-serif',
              fontWeight: 700,
              color: 'primary.main',
              textShadow: '1px 1px 2px rgba(0, 0, 128, 0.3)', // Reduzi a sombra do texto
              background: 'linear-gradient(45deg, rgba(0, 0, 128, 0.3), rgba(255, 255, 255, 0.2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                textShadow: '2px 2px 4px rgba(0, 0, 128, 0.5)',
                transform: 'scale(1.05)',
              },
            }}
          >
            {title}
          </Typography>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mb-4"
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
            className="mb-4"
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
            className="w-full"
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
            bgcolor="rgba(30, 58, 138, 0.5)" // Ajustado para menor intensidade
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
