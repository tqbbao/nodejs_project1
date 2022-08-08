const express = require('express');
const routes = express.Router();
const User = require('../../../models/User.model.js');
const createError = require('http-errors');
routes.get('/', (req, res, next) => {
    res.json('Listen users');
})

routes.post('/register',async (req, res, next) => {
    console.log(req.body);
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw createError.BadRequest();
        }
        const isExits = await User.findOne({
            username: email
        });
        if(isExits){
            throw createError.Conflict(`${email} is re`);
        }

        const isCreate = await User.create({
            username: email,
            password: password
        })
        return res.json({
            status: 'okay',
            elements: isCreate
        })
    } catch(error){
        next(error);
    }

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