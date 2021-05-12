require("dotenv").config();
const db = require("../db")
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
    const id=parseInt(res["id"],10)
    try {
        const user = await db.any(`SELECT * FROM users WHERE id = $1`, id)
        return res.json(user)
    }catch(err){
        return res.json({message: err.message})
    }
}


//update a user not added to routes yet
async function updateUser(req,res){
    const userID=parseInt(req.params.id,10)
    try{
        await db.none(`UPDATE users SET first_name=$1, last_name=$2, user_name=$3, email=$4, password=$5, medical_issue=$6, account_type=$7`,[
            req.body.first_name,
            req.body.last_name,
            req.body.user_name,
            req.body.email,
            req.body.password,
            req.body.medical_issue,
            req.body.account_type,
            userID
        ])
    return res.json({
        message:success
    })
    }
    catch(err){
        res.status(500).send(err)
    }
}
//create one user and add to table not added to routes yet
async function registerUser(req,res){
    let user=req.body
    let hashedPassword;
    const rounds=10
    console.log('created user, ',user)
    if(!user){
        return res.status(400).json({
            message:"Account Information Invalid"
        })
    }
    try{
        hashedPassword = await bcrypt.hash(user.password, rounds)
        user["password"]=hashedPassword
    }catch{
        return res.status(401).json({
            message: "Invalid Password",
            error: err.message
        })
    }
    let token;
    try{
        await db.none(`INSER INTO users (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name}, ${user_name}, ${email}, ${password}, ${medical_issue}, ${account_type})`,
        user
        )
        const userID = await db.one(`SELECT id, account_type FROM users WHERE user_name=${user_name}`, user)
        token=await generateToken(userID)
    }catch(err){
        console.log(`ERROR CAUGHT : ${err.message}`)
        return res.status(400).send(err)
    }
    return res.status(201).json({token})

}

//delete a user from database not yet added to routes
async function deleteUser(req,res) {
    const id = parseInt(res["id"],10)
    try{
        await db.none(`DELETE FROM users WHERE id=$1`, id)
        return res.json({
            message:"successfully deleted",
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

//login user not yet added to routes
async function userLogin(req,res){
    const{password}=req.body
    const {exists} = await db.one(`SELECT EXISTS(SELECT * FROM users WHERE user_name=${user_name})`,req.body)
    let user;
    if(!exists){
        return res.status(404).json({
            message: "User Not Found"
        })
    } else {
        user = await db.one(`SELECT * FROM users WHERE user_name=${user_name}`, req.body)
        console.log(user)
    }
    let match;
    try{
        match=await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }else{
            const token = await generateToken(user)
            return res.status(202).json({"token":token})
        }
    } catch(err){
        return res.status(400).json(err.message)
    }
}

module.exports = {
    getAUser,
    getAllUsers,
    getUserByName,
};
