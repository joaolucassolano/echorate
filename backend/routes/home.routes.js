const express = require('express');
const router = express.Router();

async function fetchProfile(token) {
    const result = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

router.get('/home', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.redirect('/login');
    } else {
        let profile = req.cookies.profile;
        if (!profile) {
            profile = await fetchProfile(accessToken);
            res.cookie('profile', profile, { httpOnly: true });
        }
        
        res.json(profile);
    }
});

module.exports = router;