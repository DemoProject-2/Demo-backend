require("dotenv").config();
//const db = require("../db")
// const bcrypt=require("bcrypt")
// const {generateToken} =  require("../middleware/users-auth")

//get all users from database
async function getAllUsers(req,res){
    try{
        const users = await db.any(`SELECT * FROM users`)
        console.log(users)
        return res.json(users)
    }catch(err) {
        res.send(err)
    }
}

//get user by username
async function getUserByName(req,res) {
    const query = req.params.query
    try{
        const results = await db.any(`SELECT * FROM users WHERE lower(user_name) LIKE '%${query.toLowerCase()}%';`)
        return res.status(200).json(results)
    }catch(err){
        res.json(err.message)
    }
}

//get a single user from table
async function getAUser(req,res){
    const id=parseInt(res["user_id"],10)
    try {
        const user = await db.none(`SELECT * FROM users WHERE id = $1`, id)
        return res.json(user)
    }catch(err){
        return res.json({message: err.message})
    }
}

module.exports = {
    getAUser,
    getAllUsers,
    getUserByName
};