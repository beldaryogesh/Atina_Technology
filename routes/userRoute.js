const express = require('express');
const Router = express.Router();

const userCon = require('../controller/userCon')
const userMiddleware = require('../middleware/userMiddlware');
const verifyToken = require('../middleware/verifyToken');

Router.post('/registerUser',[userMiddleware.registerUser], userCon.createUser);
Router.get('/getuser', userCon.getUser);
Router.post('/loginUser',[userMiddleware.loginUser], userCon.loginUser);
Router.post('/logOut',[verifyToken.authenticateUser], userCon.logOut);
Router.put('/forgetPassword', userCon.forgetPassword);
// Router.put('/resetPassword', [verifyToken.authenticateUser, userMiddleware.resetPassword], userCon.resetPassword);
Router.put('/changePassword', [verifyToken.authenticateUser, userMiddleware.changePassword], userCon.changePassword);

module.exports = Router
