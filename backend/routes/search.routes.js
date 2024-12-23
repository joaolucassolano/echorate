const express = require('express');
const db = require('../config/database');
const router = express.Router();

router.get('/search', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(401).send(null);
    } else {
        const params = new URLSearchParams();
        params.append('q', req.query.q);
        params.append('type', 'track');

        const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (result.status === 401) {
            res.status(401).send(null);
        } else {
            const tracks = await result.json();
            tracks.tracks.items.forEach(async track => {
                const result = await db.query(
                    "SELECT * FROM track_info WHERE track_id = $1",
                    [track.id]
                );

                if (result.rows.length > 0) return;

                await db.query(
                    "INSERT INTO track_info (track_id, track_name, artist_name, spotify_link) VALUES ($1, $2, $3, $4)",
                    [track.id, track.name, track.artists[0].name, track.external_urls.spotify]
                );
            });

            res.json(tracks);
        }
    }
});

module.exports = router;