/**
 * @author Aakash Jangid
 * @mail ajangid25@gmail.com
 * @desc entry point for server
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
let cors = require('cors')
require('dotenv').config();

connectDB();

const employees = require('./routes/routes')

const app = express()
app.use(express.json())
app.use(cors())
// to store the auth token
app.use(cookieParser());

app.use(express.static(`${__dirname}/client/public`));

app.use('/api/v1/employee', employees);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Click here to open: http://localhost:${PORT}`)
});