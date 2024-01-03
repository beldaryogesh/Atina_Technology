const jwt = require('jsonwebtoken');

function createToken(user) {
    let token = jwt.sign(
        {
          userId: user.id,
          organisation: "Atina-Technology",
          
        },
        "PRACTICE-TEST",
        { expiresIn: 2 * 60 * 60 }
      );
      return token
}

module.exports = createToken;