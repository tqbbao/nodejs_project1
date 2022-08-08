const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.json('This is Home page ')
})

routes.use('/user', require('./v1/users/User.route.js'))

module.exports = routes;