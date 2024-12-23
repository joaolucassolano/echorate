const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors');
const likeRoute = require('./routes/likes.routes');
const reviewRoute = require('./routes/reviews.routes');
const listenRoute = require('./routes/listen.routes');
const searchRoute = require('./routes/search.routes');
const homeRoute = require('./routes/home.routes');
const authRoute = require('./routes/auth.routes');

const allowedOrigins = [
    'http://localhost:3000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
};

const app = express();
const router = express.Router();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api', likeRoute);
app.use('/api', reviewRoute);
app.use('/api', listenRoute);
app.use('/api', searchRoute);
app.use('/api', homeRoute);
app.use('/api', authRoute);


app.use('/', router);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
