const app= require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

sequelize.sync({
    force: false
}).then( () => {
    console.log('base de donnees connecte...');
    app.listen(PORT, () => {
        console.log('le serveur est en marche sur le port ${PORT}');
    });
}).catch(err => {
    console.error('impossible de connecter sur la base de donnees', err);
});