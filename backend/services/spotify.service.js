exports.getTrackData = async (uri, token) => {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${uri}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    return result.json();
};