//get all specialists from database
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any("SELECT * FROM Specialists");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//search for specialists by name
// async function getADoctor(req, res) {
//     try {
//         const doctors = await db.one("SELECT * FROM doctors WHERE doctor_name = $1");
//         return res.json(doctors);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// }

//get all specialists that specialize in a specific field
async function getSpecialists(req, res) {
    const medicalIssue=JSON.stringify(req.params.medical_issue)
    try {
        const specialists = await db.one("SELECT * FROM Specialists WHERE medical_issue = $1",
        medicalIssue);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}
