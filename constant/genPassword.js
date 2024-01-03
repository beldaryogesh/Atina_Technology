function generateRandomPassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '$@&#';
    const numericChars = '0123456789';
    const allChars = lowercaseChars + uppercaseChars + specialChars + numericChars;
  
    const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];
  
    const randomLowercase = getRandomChar(lowercaseChars);
    const randomUppercase = getRandomChar(uppercaseChars);
    const randomSpecial = getRandomChar(specialChars);
    const randomNumeric = getRandomChar(numericChars);
  
    const remainingLength = Math.floor(Math.random() * (12 - 4)) + 8; // Random length between 8 and 15
  
    const randomChars = Array.from({ length: remainingLength - 3 }, () => getRandomChar(allChars));
  
    const passwordArray = [randomLowercase, randomUppercase, randomSpecial, randomNumeric, ...randomChars];
  
    const shuffledPassword = passwordArray.sort(() => Math.random() - 0.5);

    const password = shuffledPassword.join('');
  
    return password;
}


module.exports = {
    generateRandomPassword
}