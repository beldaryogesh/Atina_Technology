const express = require('express');
const Router = express.Router();

const contactController = require('../controller/contactController');
const verifyToken = require('../middleware/verifyToken');
const contactMiddleware = require('../middleware/contactMiddleware');

Router.post('/addContacts', [verifyToken.authenticateUser, contactMiddleware.addContact],contactController.addContact);
Router.get('/getAllContacts', contactController.getAllContacts);
Router.post('/getUserWithContacts',contactController.getUserWithContacts);
module.exports = Router;
