//get all specialists from database
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any("SELECT * FROM specialists");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//search for specialist by name
async function getASpecialist(req, res) {
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE first_name = $1");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get all specialists of a specific field completed
async function getSpecialists(req, res) {
    const specialty=JSON.stringify(req.params.medical_issue)
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE specialty = $1",
        specialty);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//register as a specialist
async function specialistSignUp(req, res) {
    try {
        const specialists = await db.none(`INSERT INTO specialists (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name},${user_name}, ${email},${password},${medical_issue},${account_type}`);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}