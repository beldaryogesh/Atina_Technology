const Contact = require("../model/contactModel");
const { TokenBlacklist, User } = require("../model/userModel");

const addContact = async (req, res) => {
  try {
    const { fullname, address, contactno, zip, email } = req.body;
    const userId = req.userId;
    let token = req.headers["x-api-key"];

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (await TokenBlacklist.findOne({ where: { token } })) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    let obj = {
      fullname: fullname,
      address: address,
      contactno: contactno,
      zip: zip,
      email: email,
      created_by: userId,
    };
    const newContact = await Contact.create(obj);

    return res
      .status(201)
      .json({ message: "Contact added successfully", contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.findAll({ });
      let data = [];
      for(let i=0; i<contacts.length; i++){
        let user = await User.findOne({where : {id : contacts[i].created_by}})
        data.push({
            id: contacts[i].id,
            fullname: contacts[i].fullname,
            address: contacts[i].address,
            contactno: contacts[i].contactno,
            zip: contacts[i].zip,
            email: contacts[i].email,
            createdAt: contacts[i].createdAt,
            updatedAt: contacts[i].updatedAt,
            created_by: contacts[i].created_by,
            userDetails : {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        })
      }
      return res.status(200).json({errorCode : 200, message : 'Contacts', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({errorCode : 500, message: 'Internal Server Error' });
    }
  };

const getUserWithContacts = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res
        .status(200)
        .json({ errorCode: 400, message: "Please Provide UserId" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let data = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    let contact = await Contact.findAll({
      where: {
        created_by: userId,
      },
    });
    if (contact.length == 0) {
      data.contactDetails = "No Contact Details Exist For This User ID";
    }
    if (contact.length != 0) {
      data.contactDetails = [];
      for (let i = 0; i < contact.length; i++) {
        data.contactDetails.push({
          id: contact[i].id,
          fullname: contact[i].fullname,
          address: contact[i].address,
          contactno: contact[i].contactno,
          zip: contact[i].zip,
          email: contact[i].email,
          createdAt: contact[i].createdAt,
          updatedAt: contact[i].updatedAt,
          created_by: contact[i].created_by,
        });
      }
    }
    return res.status(200).json({errorCode : 200, message : 'User Details With Contacts', data})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addContact,
   getAllContacts,
  getUserWithContacts,
};
