const router = require('express').Router()
const User = require('../models/CreateUser')
const bcrypt = require('bcrypt')

router.post('/', async (req,res) =>{
    const {name, email, password, confirmpassword} = req.body

    if(!name){
        res.status(422).json({msg: "Invalid name!"})
        return
    }

    if(!email){
        res.status(422).json({msg: "Invalid email!"})
        return
    }

    if(!password){
        res.status(422).json({msg: "Invalid password!"})
        return
    }
    if (!confirmpassword){
        res.status(422).json({msg: "You must confirm your password!"})
        return
    }
    if(password != confirmpassword){
        res.status(422).json({msg: 'Passwords are differents!'})
        return
    }

    //Check if user already exists.

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(422).json({msg: 'User already exists!'})
        return
    }

    //create a hash password
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = {
        name,
        email,
        password: hashPassword
    }

    try{
         await User.create(user)
         res.status(201).json({msg:'User created successfuly!'})

    } catch(error){
        res.status(500).json({msg: 'An error ocurred', error})

    }

})

module.exports = router