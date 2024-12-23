const db = require('../config/database');
const spotify = require('../services/spotify.service');

exports.getTrackInfo = async (trackId, token) => {
    const result = await db.query(
        "SELECT * FROM track_info WHERE track_id = $1",
        [trackId]
    );
    return result.rows;
}

exports.newTrackInfo = async (trackId, token) => {
    const track = await spotify.getTrackData(trackId, token);

    await db.query(
        "INSERT INTO track_info (track_id, track_name, artist_name, spotify_link) VALUES ($1, $2, $3, $4)",
        [trackId, track.name, track.artists[0].name, track.external_urls.spotify]
    );
};