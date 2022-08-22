const express = require('express');
const routes = express.Router();
const User = require('../../../models/User.model.js');
const createError = require('http-errors');
const {userValidate} = require('../../../helpers/validation.js');
const { create } = require('../../../models/User.model.js');

const {signAccessToken, verifyAccessToken, signRefreshToken} = require('../../../helpers/jwt_service.js');


routes.get('/', (req, res, next) => {
    res.json('Listen users');
})

routes.post('/register',async (req, res, next) => {
    console.log(req.body);
    try{
        const {email, password} = req.body;
        const {error} = userValidate(req.body);
        console.log(`:::error validation::`, error);
        if(error){
            throw createError(error.details[0].message)
        }
        const isExits = await User.findOne({
            email: email
        });
        if(isExits){
            throw createError.Conflict(`${email} is re`);
        }

        const user = new User({
            email: email,
            password
        })
        const saveUser = await user.save();
        return res.json({
            status: 'okay',
            elements: saveUser
        })
    } catch(error){
        next(error);
    }

})

routes.post('/login',async (req, res, next) => {
    console.log(req.body);

    try {
        const {email, password} = req.body;
        const {error} = userValidate(req.body);
        console.log(`:::error validation::`, error);
        if(error){
            throw createError(error.details[0].message)
        }
        const user = await User.findOne({email});
        if(!user){
            throw createError.NotFound('User not registerd');
        }
        const isValid = await user.isCheckPassword(password);
        if(!isValid){
            throw createError.Unauthorized();
        }

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        // res.send(user);
        res.json({
            user,
            accessToken,
            refreshToken
        })
    } catch (error) {
        next(error);
    }
})

routes.post('/refresh-token', (req, res, next) => {
    try {
        console.log(req.body);
        const {refreshToken} = req.body;

    } catch (error) {
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

routes.get('/getlist',verifyAccessToken, (req, res, next) => {
    console.log(req.headers);
    const listUsers = [
        {
            email: 'abc@gmail.com'
        },
        {
            email: 'bcd@gmail.com'
        }
    ]
    res.json({
        listUsers
    })

})


module.exports = routes;

// "/abc" => /abc
// "/ab?cd" => /acd or /abcd
// "/ab+cd" => /abcd or /abbbcd or /abbbbbbbcd 
// "/ab*cd" => '/ab' + anything + 'cd' ex: abcd, abxcd, abweiskjcd, ab123cd
// /a/ => RegExp anything that contains "a"
// /.*fly$/ => RegExp anything that ends with "fly" ex: butterfly and dragonfly