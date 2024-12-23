const db = require('../config/database');
const trackInfo = require('../services/trackinfo.service');

exports.toogleListen = async (req, res) => {
    const { uri, userId } = req.body;

    if (!uri || !userId) {
        return res.status(400).send({ status: false, message: 'Track and user are required' });
    }

    const trackId = uri.split(":")[2];

    try {
        const result = await db.query(
            "SELECT * FROM listen WHERE user_id = $1 AND track_id = $2",
            [userId, trackId]
        );

        if (result.rows.length > 0) {
            await db.query(
                "DELETE FROM listen WHERE user_id = $1 AND track_id = $2",
                [userId, trackId]
            );

            return res.status(200).send({
                message: "Listen removed successfully!",
                body: {
                    listen: { trackId, userId }
                }
            });
        } else {
            await db.query(
                "INSERT INTO listen (track_id, user_id) VALUES ($1, $2)",
                [trackId, userId]
            );

            return res.status(201).send({
                message: "Listen added successfully!",
                body: {
                    listen: { trackId, userId }
                }
            });
        }
    } catch (error) {
        console.error('Error handling listen:', error);
        return res.status(500).send({
            status: false,
            message: 'Error processing listen',
        });
    }
};


exports.findByUserId = async (req, res) => {
    const userId = req.params.id;
    const { rows } = await db.query(
        "SELECT * FROM listen WHERE user_id = $1", [userId]
    );

    const token = req.cookies.accessToken;

    const tracks = await Promise.all(
        rows.map(async (row) => {
            const track = await trackInfo.getTrackInfo(row.track_id, token);
            return track[0];
        })
    );

    res.status(200).send(tracks);
}