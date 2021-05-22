const db = require("../db")
const bcrypt = require("bcrypt")
const { generateToken } = require('../middleware/user_auth')

async function login(req, res) {
    const users = req.body;
    console.log(users)
    const { exists } = await db.one(`SELECT EXISTS(SELECT * FROM users WHERE user_name = $1)`, users.user_name)

    if (!exists) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    } else {
        try{
        let user = await db.one(`SELECT * FROM users WHERE user_name = $1 AND password = $2)`, [users.user_name, users.password])
        console.log(user)
        }catch(err){
            return res.json(err.message)
        }
    }
    let match;
    try {
        match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        } else {
            const token = await generateToken(user)
            return res.status(202).json({ "token": token })
        }
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

//create one user and add to table not added to routes yet
async function register(req, res) {
    let user = req.body
    let hashedPassword;
    const rounds = 10
    if (!user) {
        return res.status(400).json({
            message: "Account Information Invalid"
        })
    }
    try {
        hashedPassword = await bcrypt.hash(user.password, rounds)
        user.password = hashedPassword
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Password",
            error: err.message
        })
    }
    let token;
    try {
        console.log(user.password)
        await db.none('INSERT INTO users (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [user.first_name, user.last_name, user.user_name, user.email, user.password, user.medical_issue, user.account_type]
        )
        // const userID = await db.one(`SELECT id, account_type FROM users WHERE user_name=${user_name}`, user)
        // console.log("User Created: ", userID)
        token = await generateToken(1)
        return res.status(201).json({ token })
    } catch (err) {
        console.log(`ERROR CAUGHT : ${err.message}`)
        return res.status(400).json({ error: err.message })
    }
}

module.exports = {
    login,
    register
}