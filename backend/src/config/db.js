const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    // recuperer le donner dans .env
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

  {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

module.exports = { sequelize };


//supabase

//const sequelize = new Sequelize('postgresql://postgres.qooyarxnyetsynbaljhx:[Computer-Store@2024]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres', {
  //  dialect: 'postgres',
   //// dialectOptions: {
    //    ssl: {
    //        require: true,
    ////        rejectUnauthorized: true// Assurez-vous d'utiliser cette option si SSL est requis
  //      }
  //  }
//});