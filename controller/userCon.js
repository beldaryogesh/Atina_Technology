const db = require('../config/db');
const { TokenBlacklist, User } = require('../model/userModel');
const bcrypt = require("bcryptjs");
const jwtToken = require("../constant/jwtToken");
const MailSender = require('../constant/mailSender');
const newPassword = require('../constant/genPassword');
const Sequelize = require('sequelize');

const createUser = async function ( req, res){
    try{
        let {firstname, lastname, username, email, password, phone} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 8);
        let obj = {
          firstname : firstname,
          lastname : lastname,
          phone : phone,
          username : username,
          email : email,
          password : encryptedPassword
        }
       let newUser =  await User.create(obj)
       return res.status(200).json({message : 'user register successfully', user : newUser})
    }catch(error){
        console.log(error)
    }
}

const getUser = async function(req, res){
  try {
    const users = await User.findAll();
    let data = []
    for(let i=0; i<users.length; i++){
      data.push({
            id: users[i].id,
            firstname: users[i].firstname,
            lastname: users[i].lastname,
            username: users[i].username,
            email: users[i].email,
            phone: users[i].phone,
            createdAt: users[i].createdAt,
            updatedAt: users[i].updatedAt
      })
    }
    if(data.length == 0){
      return res.status(200).json({errorCode : 404, message : 'No User Exist'})
    }
   return res.status(200).json({errorCode : 200, message : 'user daitels...!', data,})
  } catch (error) {
    console.error(error);
    return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
  }
}

const loginUser = async function(req, res){
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(200).json({errorCode : 401, message: 'Invalid credentials' });
    }
  
    const token = jwtToken(user);
    res.setHeader("x-api-key", token);
    return res.status(200).json({errorCode : 200, message : 'Login Successfully', token : token})
  } catch (error) {
    console.log(error);
    return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
  }
}

const logOut = async function(req, res){
  try {
    let token = req.headers['x-api-key'];

    await TokenBlacklist.create({token});

    return res.status(200).json({ errorCode: 200, message: 'Logout Successful' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
  }
}


const forgetPassword = async function(req, res){
  try {
    if(req.body == undefined){
      return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
    }
    if(!req.body.email){
      return res.status(200).json({errorCode : 400, message : 'Please Provide Email'})
    }
    let email = req.body.email;
  
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let userEmail = [req.body.email]
    if(req.body.email != user.email){
      return res.status(200).json({errorCode : 401, message : 'Invalid Email'})
    }
    let pass = newPassword.generateRandomPassword()
    user.password = await bcrypt.hash(pass, 8)
    await user.save()
    let obj = {
      notificationTitle : 'Forgate Your Password ',
      description : `Do Not Share The Password With Anyone, Your Password Is :-  ${pass} `
    }

    MailSender.emailSender(userEmail, obj);
    return res.status(200).json({errorCode : 200, message : 'New Password Send On Your Email', newPassword : pass})
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
  }
};

// const resetPassword = async function(req, res){
//   try {
//     let { newPassword } = req.body;
//     let token = req.headers['x-api-key'];
//     let user = await User.findOne({
//       where: {
//         resetToken: token,
//         resetTokenExpiry: {
//           [Sequelize.Op.gte]: new Date(), 
//         },
//       },
//     });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token' });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 8);
//     await user.update({ password: hashedPassword, resetToken: null, resetTokenExpiry: null });

//     res.status(200).json({ message: 'Password reset successfully' });
 
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
//   }
// }

const changePassword = async function(req, res) {
  try {
    let { currentPassword, newPassword } = req.body;
    let userId = req.userId;
    let token = req.headers['x-api-key'];

    if (await TokenBlacklist.findOne({ where: { token } })) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 8);
    await user.update({ password: hashedNewPassword });
    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorCode: 500, message: 'Internal Server Error' });
  }
};


module.exports = {
    createUser,
    getUser,
    loginUser,
    logOut,
    forgetPassword,
    // resetPassword
    changePassword
}