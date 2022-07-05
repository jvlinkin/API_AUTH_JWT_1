const router = require('express').Router()
const User = require('../models/CreateUser')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')


router.post('/', async (req,res) =>{
    const {email, password} = req.body

    if(!email){
        res.status(422).json({msg: "Necessary email!"})
        return
    }

    if(!password){
        res.status(422).json({msg:"Password necessary!"})
        return
    }

    //check if user exists
    const userExists = await User.findOne({email: email})

    if(!userExists){
        res.status(404).json({msg: 'User not found!'})
        return
    }

    //check if password is corret.

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if(!checkPassword){
        return res.status(422).json({msg: "Invalid password!"})
        
    }
    
    //Token generating...
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({id: userExists._id}, secret)
        res.status(200).json({msg: "Authenticated!", token})
        

    } catch (error){
        res.status(500).json({msg: error})
        
    }

    

    //if it's correct, create a token, and go ahead.
})

//function to check if token is valid (middleware)


module.exports = router


