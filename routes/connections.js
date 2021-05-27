const express = require('express')
const router = express.Router()
const {
    getAllConnections,
    getAllUserConnections,
    setConnection,
    deleteConnection
} = require("../controllers/connectionController")
const { authorize } = require('../middleware/user_auth')

//get saved specialists of a particular user
router.get('/:userId', [authorize], getAllUserConnections)

//let a patient save a specialist
router.post('/:patientId/:specialistId', setConnection)

//delete connection
router.post('/delete', deleteConnection)

module.exports =  router;