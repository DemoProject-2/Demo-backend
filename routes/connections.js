const router = new express.Router()
const express = require('express')
const {
    getAllConnections,
    getAllUserConnections,
    setConnection
} = require("../controllers/connectionController")

//get saved specialists of a particular user
router.get('/connections/:patientId', getAllUserConnections)

//let a patient save a specialist
router.post('/connections/:patientId/:specialistID', setConnection)