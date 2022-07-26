const express = require('express');
const router = express.Router();
const userServices = require('../services/users.service');
const isAuth = require('../middleware/auth.middleware')


router.post('/', (req, res) => {
    userServices.createUser(req, res);
}).post('/login', (req, res) => {
    userServices.login(req, res);
}).delete('/:userId',isAuth, (req, res) => {
    userServices.deleteUser(req, res);
});

module.exports = router; 