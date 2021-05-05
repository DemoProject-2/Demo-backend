//get all specialists from database
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any("SELECT * FROM specialists");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//search for doctor by name
async function getASpecialist(req, res) {
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE first_name = $1");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get all specialists of a specific field
async function getSpecialists(req, res) {
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE specialty = $1");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//register as a specialist
async function specialistSignUp(req, res) {
    try {
        const specialists = await db.none(`INSERT INTO specialists (first_name, last_name, email, username, password, specialty) VALUES (${first_name}, ${last_name},${email}, ${username},${password},${specialty}`);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}