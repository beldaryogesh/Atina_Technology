const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('atinatechnology', 'root', 'Pass@123', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.sync({force:false}).then(()=> {
    console.log('tables have been created');
}).catch(err => {
    console.log(`${err} this is the error`);
})

module.exports = sequelize;






