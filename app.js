const { config } = require('dotenv');
const express = require('express');
const app = express();
const helmet = require('helmet');
const createError = require('http-errors');
require('dotenv').config();

// app.use(helmet());
// console.log(`PORT:::`, process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('./routes'))


// http-erros
app.use((req, res, next) => {
    next(createError(404, "Not found!"))
})
app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

module.exports = app;




