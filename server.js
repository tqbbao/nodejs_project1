const { config } = require('dotenv');
const express = require('express');
const app = express();
require('dotenv')/config();
const helmet = require('helmet');

app.use(helmet());

// console.log(`PORT:::`, process.env.PORT);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
    res.json('This is Home page ')
})

app.listen( PORT , () => {
    console.log('Server running at ${PORT}');
})
