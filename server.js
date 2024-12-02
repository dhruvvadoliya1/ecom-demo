const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const router = require('./routers');

const {connectDB} = require('./utils/mongooseConnection');
connectDB();

const app = express()
app.use(express.json())

app.use('/api', router)

app.use((req, res) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
})

app.listen(3000, () => {
    console.log("server is up and running")
})