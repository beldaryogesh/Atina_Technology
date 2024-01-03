const { User } = require('../model/userModel');
const regex = require('../constant/regex')

const registerUser = async function(req, res, next){
    try {
        let {firstname, lastname, username, email, password, phone} = req.body;
        if(!firstname){
            return res.status(200).json({errorCode : 400, message : 'Please provide First Name'})
        }
        if(!lastname){
            return res.status(200).json({errorCode : 400, message : 'Please provide Last Name'})
        }
        if(!username){
            return res.status(200).json({errorCode : 400, message : 'Please provide User Name'})
        }
        let existingUsername  = await User.findOne({ where: { username } })
        if(existingUsername ){
            return res.status(200).json({errorCode : 400, message : 'User Name Already In Use, Please Provide Unique UserName'})
        }
        if(!phone){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Number'})
        }
        if(!regex.phoneRegex.test(phone)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Valid Indian Format Number'})
        }
        let existingPhone  = await User.findOne({ where: { phone } })
        if(existingPhone ){
            return res.status(200).json({errorCode : 400, message : 'Number Is Already In Use, Please provide Unique Number'})
        }
        if(!email){
            return res.status(200).json({errorCode : 400, message : 'Please provide Email'})
        }
        if(!regex.emailRegex.test(email)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Valid Email'})
        }
        const existingEmail = await User.findOne({where: { email } });
        if (existingEmail) {
           return res.status(400).json({ errorCode: 400, message: 'Email is already in use, please provide unique email.' });
        }
        if(!password){
            return res.status(200).json({errorCode : 400, message : 'Please provide Password'})
        }
        if (!regex.passRegex.test(password)) {
            return res.status(200).json({error_code: 400, message:"please provide strong password. useing Upppercase, numbers and special charectores..!"});
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}

const loginUser = async function(req, res, next){
    try {
        const { username, password } = req.body;
        if(!username){
            return res.status(200).json({errorCode : 400, message : 'Please provide Username'})
        }
        if(!password){
            return res.status(200).json({errorCode : 400, message : 'Please provide Password'})
        }
        if (!regex.passRegex.test(password)) {
            return res.status(200).json({error_code: 400, message:"please provide strong password. useing Upppercase, numbers and special charectores..!"});
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}


const resetPassword = async function(req, res, next){
    try {
        if(req.body == undefined){
            return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
        }
        if(!req.body.newPassword){
            return res.status(200).json({errorCode : 400, message : 'Please Provide New Password'})
        }
        if (!regex.passRegex.test(req.body.newPassword)) {
            return res.status(200).json({error_code: 400, message:"please provide strong password. useing Upppercase, numbers and special charectores..!"});
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}

const changePassword = async function (req, res, next) { 
    try {
        if(req.body == undefined){
            return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
        }
        let { currentPassword, newPassword } = req.body;
        if(!currentPassword){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Current Password'})
        }
        if(!newPassword){
            return res.status(200).json({errorCode : 400, message : 'Please Provide New Password'})
        }
        if (!regex.passRegex.test(newPassword)) {
            return res.status(200).json({error_code: 400, message:"please provide strong password. useing Upppercase, numbers and special charectores..!"});
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
};




module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    changePassword
}