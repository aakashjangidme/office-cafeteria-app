const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/Routes');

let cors = require('cors')

const app = express()

app.use(cors())

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5001;
// using multer for file/ image upload
app.use(express.static(`${__dirname}/client/public`));

/// to store the auth token
app.use(cookieParser());
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const router = express.Router();
app.use('/api', router);
routes(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Click here to open: http://localhost:${port}`)
});