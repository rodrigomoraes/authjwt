// imports
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express()


// Configurar JSON response

app.use(express.json())

// Models
const User = require('./models/User');


// Open Route - Rota Publica
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Hello World'})
});

// Rota privada



// Registrar usuario
app.post('/auth/register', async(req, res) =>{
    const {name, email, password, confirmpassword} = req.body

    // Validacoes
    if(!name){
        return res.status(422).json({msg: "Nome obrigatorio"})
    }

    if(!email){
        return res.status(422).json({msg: "Email obrigatorio"})
    }
    
    if(!password){
        return res.status(422).json({msg: "Senha obrigatoria"})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg: "As senhas nao conferem"})
    }
   

    // check if user exists
const userExists = await User.findOne({email:email})

if(userExists){
    return res.status(422).json({msg: "Email ja usado"})
}

// criar password
const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password,salt)

// cria usuario
const user = new User({
    name,
    email,
    password: passwordHash
});




try {
    await user.save()
    res.status(201)
    .json({
        msg: "usuario cadastrado com sucesso"
    })
}catch(error){
    res.status(500)
    .json({
        msg:"Houve um erro"
    })
}



});

// Login
app.post("/auth/login", async(req, res) =>{
    const {email, password} = req.body

    if(!email){
        return res.status(422).json({msg: "Email obrigatorio"})
    }
    
    if(!password){
        return res.status(422).json({msg: "Senha obrigatoria"})
    }

    // check se usuario existe
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).json({msg: "Usuário não encontrado!"})
    }

    // Check se a senha combina

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json({msg: "Senha inválida"})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
        {
            id: user._id
        }, secret,
        )

        res.status(200).json({msg: "Autenticado", token})
        
        
    } catch (err) {
        console.log(err)
        res.status(500)
    .json({
        msg:"Houve um erro"
    });


    }


});





// Credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.jkg6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() =>{
    app.listen(3000)
    console.log("Banco conectado!")
}).catch((err) => console.log(err))


