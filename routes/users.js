const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/sign-in', async function (req,res){
    try{
        let username = req.body.username
        const password = req.body.password
        const data = await db.any(`SELECT users.id, users.account_type, users.password FROM users WHERE users.username = '${username}'`)
        const samePassword = bcrypt.compareSync(password,data[0].password)
        if(samePassword){
            jwt.sign({data},process.env.RANDOM_TOKEN, { expiresIn : '3600s'}, async (err, token) =>{
                await res.status(202).json({
                    id:data[0].id,
                    account_type: data[0].account_type,
                    isAuthorized: true,
                    username: data[0].username,
                    token
                })
            })
        } else {
            res.status(403).json({
                isAuthorized:false
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err,
            isAuthorized:false
        })
    }
})