const regex = require('../constant/regex');

const addContact = async function(req, res, next){
    try {
        const { fullname, address, contactno, zip, email } = req.body;
        if(!fullname){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Full Name'})
        }
        if(!address){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Address'})
        }
        if(!contactno){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Contact Number'})
        }
        if(!regex.phoneRegex.test(contactno)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Valid Indian Format Number'})
        }
        if(!zip){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Zip Number'})
        }
        if(!regex.pinRegex.test(zip)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Valid Zip(pincode) Number'})
        }
        if(!email){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Email'})
        }
        if(!regex.emailRegex.test(email)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Valid Email'})
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}

module.exports = {
    addContact
}