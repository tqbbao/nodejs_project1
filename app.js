const { config } = require('dotenv');
const express = require('express');
const app = express();
const helmet = require('helmet');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/connections_redis.js');
const redisClient = require('./helpers/connections_redis.js');


// redisClient.then( async (client) => {
//     console.log( await client.get('test',(err, result) =>{
//         if (err) throw createError.BadRequest();
//         console.log(result);
//     }));
     
    
// });

// redisClient.then(async (client)=>{
//     await client.set('new', "temp");
//     console.log(await client.get('foo'));
// });

redisClient.then( client => {
    console.log(`Create key form redis`);
    client.set('gawr', 'redis');
    console.log(`Value key form redis`);
    client.get('foo').then(result => console.log(result));
});


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




