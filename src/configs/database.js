
const Sequelize = require('sequelize');

const sequelize =  new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)

const  createConnection = async () => {
    try{
        await sequelize.authenticate().then((respond)=>{
            console.log('Database Connection Created');
        })
    }
    catch(err){
        console.log('Connection can create : ',err);
    }
}

createConnection(); 

module.exports = sequelize;