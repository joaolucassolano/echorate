const db = require('../config/database');
const trackInfo = require('../services/trackinfo.service');

exports.recordReview = async (req, res) => {
    const { uri, userId, rate } = req.body;

    if (!uri || !userId || !rate) {
        return res.status(400).send({ status: false, message: 'Track, user, and rate are required' });
    }

    let trackId = uri;

    if (uri.split(":").length === 3) {
        trackId = uri.split(":")[2];
    }

    try {
        const result = await db.query(
            "SELECT * FROM reviews WHERE user_id = $1 AND track_id = $2",
            [userId, trackId]
        );

        if (result.rows.length > 0) {
            await db.query(
                "UPDATE reviews SET rate = $1 WHERE user_id = $2 AND track_id = $3",
                [rate, userId, trackId]
            );

            return res.status(200).send({
                message: "Review updated successfully!",
                body: {
                    review: { trackId, userId, rate }
                }
            });
        } else {
            await db.query(
                "INSERT INTO reviews (track_id, user_id, rate) VALUES ($1, $2, $3)",
                [trackId, userId, rate]
            );

            return res.status(201).send({
                message: "Review added successfully!",
                body: {
                    review: { trackId, userId, rate }
                }
            });
        }
    } catch (error) {
        console.error('Error handling review:', error);
        return res.status(500).send({
            status: false,
            message: 'Error processing review',
        });
    }
};


exports.findByUserId = async (req, res) => {
    const userId = req.params.id;
    const { rows } = await db.query(
        "SELECT * FROM reviews WHERE user_id = $1", [userId]
    );

    const token = req.cookies.accessToken;

    const tracks = await Promise.all(
        rows.map(async (row) => {
            const track = await trackInfo.getTrackInfo(row.track_id, token);
            return {
                track: track[0],
                rate: row.rate
            };
        })
    );

    res.status(200).send(tracks);
}