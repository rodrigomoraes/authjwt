// imports
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express()

// Open Route - Rota Publica
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Hello World'})
});

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.jkg6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() =>{
    app.listen(3000)
    console.log("Banco conectado!")
}).catch((err) => console.log(err))


