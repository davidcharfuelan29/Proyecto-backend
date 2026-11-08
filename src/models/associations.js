const user = require('./user.model');
const project = require('./project.model');
const userProject = require('./userProject.model');

// relacionamos muchos a muchos 
user.belongsToMany(project, { through: userProject,foreignKey: 'usuario_id',as: 'proyectos' });
project.belongsToMany(user, { through: userProject,foreignKey: 'proyecto_id',as: 'usuarios' });

// relacion de administrador
project.belongsTo(user, { foreignKey: 'administrador_id', as: 'administrador' });

module.exports = {user, project, userProject};