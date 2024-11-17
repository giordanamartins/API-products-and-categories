const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = { }){
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400, //token expira em um dia
    });
}

router.post('/register', async (req, res) => {
    try{
        const { username } = req.body;

        if(await User.findOne({ username })){
            return res.status(400).send({ error: 'Username already in use.' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(201).send({
            message: 'User registered successfully!',
            user,
            token : generateToken({ id: user.id }),
        });
    }
    catch(err){
        return res.status(400).send ({error: 'Registration failed!', details: err.message});
    }
});

router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if(!user){
        return res.status(400).send({ error: 'User not found.' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password.' });
    }
    
    user.password = undefined;

    res.send({ user, 
        token : generateToken({ id: user.id })
    });
})

module.exports = app => app.use('/auth', router); 
