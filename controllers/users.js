require("dotenv").config();
const db = require("../db")
// const bcrypt=require("bcrypt")
// const {generateToken} =  require("../middleware/users-auth")
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
        const results = await db.any(`SELECT * FROM users WHERE lower(user_name) LIKE '%${query.toLowerCase()}%';`)
        return res.status(200).json(results)
    }catch(err){
        res.status(200).json(err.message)
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
// async function registerUser(req,res){
//     let user=req.body
//     let hashedPassword;
//     const rounds=10
//     console.log('created user, ',user)
//     if(!user){
//         return res.status(400).json({
//             message:"Account Information Invalid"
//         })
//     }
//     try{
//         hashedPassword = await bcrypt.hash(user.password, rounds)
//         user["password"]=hashedPassword
//     }catch{
//         return res.status(401).json({
//             message: "Invalid Password",
//             error: err.message
//         })
//     }
//     let token;
//     try{
//         await db.none(`INSERT INTO users (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name}, ${user_name}, ${email}, ${password}, ${medical_issue}, ${account_type})`,
//         user
//         )
//         const userID = await db.one(`SELECT id, account_type FROM users WHERE user_name=${user_name}`, user)
//         token=await generateToken(userID)
//     }catch(err){
//         console.log(`ERROR CAUGHT : ${err.message}`)
//         return res.status(400).send(err)
//     }
//     return res.status(201).json({token})

// }

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
// async function userLogin(req,res){
//     const{password}=req.body
//     const {exists} = await db.one(`SELECT EXISTS(SELECT * FROM users WHERE user_name=${user_name})`,req.body)
//     let user;
//     if(!exists){
//         return res.status(404).json({
//             message: "User Not Found"
//         })
//     } else {
//         user = await db.one(`SELECT * FROM users WHERE user_name=${user_name}`, req.body)
//         console.log(user)
//     }
//     let match;
//     try{
//         match=await bcrypt.compare(password, user.password)
//         if(!match){
//             return res.status(401).json({
//                 message: "Invalid Credentials"
//             })
//         }else{
//             const token = await generateToken(user)
//             return res.status(202).json({"token":token})
//         }
//     } catch(err){
//         return res.status(400).json(err.message)
//     }
// }
//select a specific type of user
async function getAccountType(req,res){
    const accountType=JSON.stringify(req.params.account_type)
    try{
        const userTypes = await db.any(`SELECT * FROM users WHERE account_type=$1`,
        accountType)
        return res.json(userTypes)
    } catch (err) {
        res.send(err)
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

module.exports = {
    getAUser,
    getAllUsers,
    getUserByName,
    getAccountType,
    getAllSpecialists,
    getAllPatients,
    getUsersByIssue
};
