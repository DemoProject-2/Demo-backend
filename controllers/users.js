require("dotenv").config();
const db = require("../db")
const bcrypt=require("bcrypt")
// const jwt = require('jsonwebtoken')
const {generateToken} =  require('../middleware/user_auth')
//USER TABLE CONTROLLERS  
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

//get user by username TODO: test/change
async function getUserByName(req,res) {
    const query = req.params.query
    try{
        // const results = await db.any(`SELECT * FROM users WHERE lower(user_name) LIKE '%${query.toLowerCase()}%';`)
        const results = await db.any(`SELECT * FROM users WHERE user_name = $1`, query)
        return res.json(results)
    }catch(err){
        res.json(err.message)
    }
}

//get the username and password, returns the username  user sign in function
async function getUserAccountInfo(req,res){ 
    const username = req.params.userName;
    const password= req.params.password;
    try {
        const user = await db.one(`SELECT * FROM users WHERE users.user_name = ${username} AND users.password = ${password}`);
        return res.json(user);
    } catch (err) {
        res.send(err);
    }
}

//get a single user from table, now works
async function getAUser(req,res){
    const id=parseInt(req.params.id,10)
    try {
        const user = await db.any(`SELECT * FROM users WHERE id = $1`, id)
        return res.json(user)
    }catch(err){
        return res.json({message: err.message})
    }
}

//get users by the a certain issue
async function getUsersByIssue(req, res) {
    const issue=req.params.issue;
    try {
        const specialists = await db.any(`SELECT * FROM users WHERE medical_issue = $1`, issue);
        return res.status(200).json(specialists);
    } catch (err) {
        res.send(err);
    }
}

async function getAllSpecialists(req, res) {
    const userType = req.params.userType;
    try {
        const specialists = await db.any(`SELECT * FROM users WHERE account_type = $1`, userType);
        return res.json(specialists);
    } catch (err) {
        res.send(err);
    }
}

async function getAllPatients(req, res) {
    const userType = req.params.userType;
    try {
        const patients = await db.any(`SELECT * FROM users WHERE account_type = $1`, userType);
        return res.json(patients);
    } catch (err) {
        res.send(err);
    }
}

//create one user and add to table not added to routes yet
async function registerUser(req,res){
    let user=req.body
    let hashedPassword;
    const rounds=10
    // console.log('created user, ',user)
    if(!user){
        return res.status(400).json({
            message:"Account Information Invalid"
        })
    }
    try{
        hashedPassword = await bcrypt.hash(user.password, rounds)
        user.password=hashedPassword
    }catch(err){
        return res.status(401).json({
            message: "Invalid Password",
            error: err.message
        })
    }
    let token;
    try{
        console.log(user.password)
        await db.none('INSERT INTO users (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [user.first_name, user.last_name, user.user_name, user.email, user.password, user.medical_issue, user.account_type]
        )
        // const userID = await db.one(`SELECT id, account_type FROM users WHERE user_name=${user_name}`, user)
        // console.log("User Created: ", userID)
        token=await generateToken(1)
        return res.status(201).json({token})
    }catch(err){
        console.log(`ERROR CAUGHT : ${err.message}`)
        return res.status(400).json({error: err.message})
    }

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

//select a specific type of user
async function getAccountType(req,res){
    const accountType=JSON.stringify(req.params.account_type);
    if(accountType === 'Specialist'){
        try{
            const userTypes = await db.any(`SELECT * FROM users WHERE account_type=$1`,
            'specialist')
            return res.json(userTypes)
        } catch (err) {
            res.send(err)
        }
    }else if(accountType === "User"){
        try{
            const userTypes = await db.any(`SELECT * FROM users WHERE account_type=$1`,
            'patient')
            return res.json(userTypes)
        } catch (err) {
            res.send(err)
        }
    }
}


//SPECIALIST TABLE CONTROLLERS
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any(`SELECT * FROM users WHERE account_type = 'specialist'`);
        return res.json(specialists);
    } catch (err) {
        res.send(err);
    }
}

//PATIENT TABLE CONTROLLERS
async function getAllPatients(req, res) {
    try {
        const patients = await db.any(`SELECT * FROM users WHERE account_type = 'patient'`);
        return res.json(patients);
    } catch (err) {
        res.send(err);
    }
}

//get patients by the a certain issue
async function getPatientsByIssue(req, res) {
    const issue=req.params.issue;
    //const account = req.params.accountType;
    try {
        const patient = await db.any(`SELECT * FROM users WHERE WHERE account_type = patient AND medical_issue = $1`, issue);
        return res.json(patient);
    } catch (err) {
        res.send(err);
    }
}

//get specialist of specific issue, same logic as "get usersByIssue, but gives error", possibly something with the routes file
async function getSpecificSpecialist(req, res) {
    const issue=req.params.issue;
    try {
        const users = await db.any(`SELECT * FROM users WHERE account_type = specialist AND medical_issue = $1`, issue);
        return res.status(200).json(users);
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    getAUser,
    getAllUsers,
    getUserByName,
    getAccountType,
    getAllSpecialists,
    getAllPatients,
    getUsersByIssue,
    getUserAccountInfo,
    getSpecificSpecialist,
    getPatientsByIssue,
    registerUser,
    userLogin
};
