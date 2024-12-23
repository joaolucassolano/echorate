const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');

const router = express.Router();

const clientId = 'e903f393ff0e46c7a389aff051bea5f7';
const redirectUri = 'http://localhost:8000/api/callback';

// Funções auxiliares para geração de código
function generateCodeVerifier(length) {
    return crypto.randomBytes(length).toString('base64').slice(0, length).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
    const hash = crypto.createHash('sha256').update(codeVerifier).digest('base64');
    return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Redireciona para o fluxo de autenticação do Spotify
router.get('/login', (req, res) => {
    redirectToAuthCodeFlow(clientId, res);
});

// Callback para tratar o retorno da autenticação do Spotify
router.get('/callback', async (req, res) => {
    const code = req.query.code;
    const verifier = req.cookies.verifier;
    try {
        const accessToken = await getAccessToken(clientId, code, verifier, redirectUri);
        // Salvar o token em um cookie ou outro método de armazenamento
        res.cookie('accessToken', accessToken, { httpOnly: true });
        // Redirecionar para o frontend com um parâmetro indicando sucesso
        res.redirect(`http://localhost:3000/home`);
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ message: "Error fetching access token." });
    }
});

// Função para redirecionar para o fluxo de autenticação do Spotify
async function redirectToAuthCodeFlow(clientId, res) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    res.cookie('verifier', verifier, { httpOnly: true });

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', redirectUri);
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

// Função para obter o token de acesso após a autenticação
async function getAccessToken(clientId, code, verifier, redirectUri) {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('code_verifier', verifier);

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

module.exports = router;
