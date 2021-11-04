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

app.listen(3000)
