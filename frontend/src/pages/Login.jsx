// src/pages/Login.jsx
import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // Redireciona o usuário para o endpoint de login do backend
    window.location.href = 'http://localhost:8000/api/login';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Log in with Spotify</h1>
      <button style={styles.button} onClick={handleLogin}>
        Entrar com Spotify
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#1db954',
    border: 'none',
    
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Login;
