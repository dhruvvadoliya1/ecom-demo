const express = require('express')
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../client/build');
    app.use(express.static(clientBuildPath));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(clientBuildPath, 'index.html'))
    );
  }

app.listen(5000, () => {
    console.log("server is up and running")
})