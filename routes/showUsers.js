require('dotenv').config()
const router = require('express').Router()
const User = require('../models/CreateUser')
const jwt = require('jsonwebtoken')





router.get('/', checkToken ,async (req,res)=>{
    const user = await User.find()

    try{
        res.status(200).json({msg: user})
        

    } catch(error){
        res.status(500).json({msg: 'An error ocurred', error})
        return
    }
})




function checkToken(req,res,next){

    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const secret = process.env.SECRET

    if (!token){
        res.status(401).json({msg: 'Access denied.'})
        return
    }
    
    
    try{
        jwt.verify(token, secret)
        next()

    } catch(error){
        res.status(400).json({msg: 'Invalid token!'})
        return
    }
}




module.exports = router