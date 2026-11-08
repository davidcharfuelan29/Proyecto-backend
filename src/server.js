const sequelize = require('./config/db');
const app = require('./app');
const dotenv = require('dotenv');
require('./models/associations');

dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('conectado a postgres con sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

sequelize.sync({force: false}).then(() => {
    console.log('base de datos sincronizada');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});