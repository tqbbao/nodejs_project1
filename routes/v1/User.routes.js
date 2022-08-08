const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.json('Listen users');
})

routes.post('/', (req, res, next) => {
    res.json('Create a users');
})

routes.delete('/id', (req, res, next) => {
    res.json('Delete a users');
})

routes.patch('/id', (req, res, next) => {
    res.json('Update a users');
})

routes.get('/id', (req, res, next) => {
    res.json('Get a users');
})
module.exports = routes;

// "/abc" => /abc
// "/ab?cd" => /acd or /abcd
// "/ab+cd" => /abcd or /abbbcd or /abbbbbbbcd 
// "/ab*cd" => '/ab' + anything + 'cd' ex: abcd, abxcd, abweiskjcd, ab123cd
// /a/ => RegExp anything that contains "a"
// /.*fly$/ => RegExp anything that ends with "fly" ex: butterfly and dragonfly