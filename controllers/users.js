const db = require("../db")

//USER TABLE CONTROLLERS  
//get all users from database
async function getAllUsers(req, res) {
    try {
        const users = await db.any(`SELECT * FROM users`)
        return res.json(users)
    } catch (err) {
        res.send(err)
    }
}

//get user by username TODO: test/change
async function getUserByName(req, res) {
    const query = req.params.query
    try {
        // const results = await db.any(`SELECT * FROM users WHERE lower(user_name) LIKE '%${query.toLowerCase()}%';`)
        const results = await db.any(`SELECT * FROM users WHERE user_name = $1`, query)
        return res.json(results)
    } catch (err) {
        res.json(err.message)
    }
}

//get the username and password, returns the username  user sign in function
async function getUserAccountInfo(req, res) {
    const username = req.params.userName;
    const password = req.params.password;
    try {
        const user = await db.one(`SELECT * FROM users WHERE users.user_name = ${username} AND users.password = ${password}`);
        return res.json(user);
    } catch (err) {
        res.send(err);
    }
}

//get a single user from table, now works
async function getAUser(req, res) {
    const id = parseInt(req.params.id, 10)
    try {
        const user = await db.any(`SELECT * FROM users WHERE id = $1`, id)
        return res.json(user)
    } catch (err) {
        return res.json({ message: err.message })
    }
}

//get users by the a certain issue
async function getUsersByIssue(req, res) {
    const issue = req.params.issue;
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

//delete a user from database not yet added to routes
async function deleteUser(req, res) {
    const id = parseInt(res["id"], 10)
    try {
        await db.none(`DELETE FROM users WHERE id=$1`, id)
        return res.json({
            message: "successfully deleted",
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

//login user not yet added to routes
//select a specific type of user
async function getAccountType(req, res) {
    const accountType = JSON.stringify(req.params.account_type);
    if (accountType === 'Specialist') {
        try {
            const userTypes = await db.any(`SELECT * FROM users WHERE account_type=$1`,
                'specialist')
            return res.json(userTypes)
        } catch (err) {
            res.send(err)
        }
    } else if (accountType === "User") {
        try {
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
// async function getPatientsByIssue(req, res) {
//     const issue=req.params.issue;
//     //const account = req.params.accountType;
//     try {
//         const patient = await db.any(`SELECT * FROM users WHERE account_type = patient AND medical_issue = $1`, issue);
//         return res.json(patient);
//     } catch (err) {
//         res.send(err);
//     }
// }

//get specialist of specific issue, same logic as "get usersByIssue, but gives error", possibly something with the routes file
// async function getSpecificSpecialist(req, res) {
//     const issue=req.params.issue;
//     try {
//         const users = await db.any(`SELECT * FROM users WHERE account_type = specialist AND medical_issue = $1`, issue);
//         return res.status(200).json(users);
//     } catch (err) {
//         res.send(err);
//     }
// }

//get user by account by account_type by user_name
async function getAccountByTypeAndUsername(req, res) {
    let info = req.body;
    try {
        const users = await db.any(`SELECT * FROM users WHERE account_type = $1 AND user_name = $2`, [info.account_type, info.user_name]);
        return res.json(users);
    } catch (err) {
        res.send(err);
    }
}

async function getAccountByIssueAndUsername(req, res) {
    let info = req.body;
    try {
        const users = await db.any(`SELECT * FROM users WHERE medical_issue = $1 AND user_name = $2`, [info.medical_issue, info.user_name]);
        return res.json(users);
    } catch (err) {
        res.send(err);
    }
}

async function getSpecificAccount(req, res) {
    let info = req.body;
    try {
        const users = await db.any(`SELECT * FROM users WHERE medical_issue = $1 AND user_name = $2 AND account_type = $3`, [info.medical_issue, info.user_name, info.account_type]);
        return res.json(users);
    } catch (err) {
        res.send(err);
    }
}

async function getAccountByTypeAndIssue(req, res) {
    let info = req.body;
    try {
        const users = await db.any(`SELECT * FROM users WHERE medical_issue = $1 AND account_type = $2`, [info.medical_issue, info.account_type]);
        return res.json(users);
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
    getAccountByTypeAndUsername,
    getAccountByIssueAndUsername,
    getSpecificAccount,
    getAccountByTypeAndIssue
};
