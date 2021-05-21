const express = require('express')
//const db = require("../seeds/seed_users")
const router = new express.Router()
// const verifyToken = require('../middleware/verifytoken')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const {
    getAUser,
    getAllUsers,
    getUserByName,
    getAccountType,
    getAllSpecialists,
    getAllPatients,
    getUsersByIssue,
    getUserAccountInfo,
    registerUser,
    userLogin,
    getAccountByTypeAndUsername,
    getAccountByIssueAndUsername,
    getSpecificAccount,
    getAccountByTypeAndIssue
} = require("../controllers/users");
// const { get } = require('./patients');

// router.post('/sign-in', async function (req,res){
//     try{
//         let username = req.body.username
//         const password = req.body.password
//         const data = await db.any(`SELECT users.id, users.account_type, users.password FROM users WHERE users.username = '${username}'`)
//         const samePassword = bcrypt.compareSync(password,data[0].password)
//         if(samePassword){
//             jwt.sign({data},process.env.RANDOM_TOKEN, { expiresIn : '3600s'}, async (err, token) =>{
//                 await res.status(202).json({
//                     id:data[0].id,
//                     account_type: data[0].account_type,
//                     isAuthorized: true,
//                     username: data[0].username,
//                     token
//                 })
//             })
//         } else {
//             res.status(403).json({
//                 isAuthorized:false
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             error: err,
//             isAuthorized:false
//         })
//     }
// })
router.use(express.json());
router.use((req, res, next) => {
    console.log("users router");
    next();
  });
//get a user
router.get('/user/:id', getAUser);
//get all users
router.get('/all-users', getAllUsers);
//get single user by name
router.get('/username/:query', getUserByName);
//get all specialists
router.get('/all-specialist/:userType', getAllSpecialists); //http://localhost:3000/users/all-specialist/specialist

//get all patients
router.get('/all-patients/:userType', getAllPatients); //http://localhost:3000/users/all-patients/patient
//get accout by type
router.get('/get-account-type/:account_type', getAccountType);
//get Users by the issue they deal with
router.get('/specialty-users/:issue', getUsersByIssue); //http://localhost:3000/users/specialty-patients/Depression

//get users by account type and userName
router.get('/typeAndName', getAccountByTypeAndUsername);
//get by account type and issue
router.get('/typeAndIssue', getAccountByTypeAndIssue)
//get users by medical issue and userName
router.get('/issueAndName', getAccountByIssueAndUsername);
//get by account type, issue, and username
router.get('/allFilters', getSpecificAccount)
//get username and password
router.get('/:username/:password', getUserAccountInfo); //usersign in route

router.post("/register",registerUser)//register  new user

router.post("/sign-in",userLogin) //login user


module.exports = router;

//FOR TESTING: localhost:3000/users/get-single-uesr, localhost:3000/users/get-users, etc.
