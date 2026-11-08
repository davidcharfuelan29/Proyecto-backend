
const project = require('../models/project.model');
const User = require('../models/user.model');
const UserProject = require('../models/userProject.model');
const ROLES = require('../utils/constants');

// Crear un proyecto
exports.createProject = async (data) => {
    try {
        const { nombre, descripcion, administrador_id } = data;

        // Verificar que el administrador exista
        const admin = await User.findByPk(administrador_id);

        if (!admin) {
            throw new Error('Administrador no encontrado');
        }

        // Verificar que tenga el rol de administrador
        if (admin.rol_id !== ROLES.ADMINISTRADOR) {
            throw new Error('El usuario no tiene permisos de administrador');
        }

        const newProject = await project.create({
            nombre,
            descripcion,
            administrador_id
        });

        return newProject;

    } catch (error) {
        throw new Error(error.message);
    }
};


// Consultar todos los proyectos
exports.getAllProjects = async () => {
    try {
        const projects = await project.findAll();

        return projects;

    } catch (error) {
        throw new Error(error.message);
    }
};


// Consultar los proyectos asignados a un usuario
exports.getProjectByuserId = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: project,
                as: 'proyectos'
            }]
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user.proyectos;

    } catch (error) {
        throw new Error(error.message);
    }
};


// Asignar un usuario a un proyecto
exports.assignUserToProject = async (data) => {
    try {
        const { usuario_id, proyecto_id } = data;

        const user = await User.findByPk(usuario_id);
        const projectFound = await project.findByPk(proyecto_id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (!projectFound) {
            throw new Error('Proyecto no encontrado');
        }

        // Evitar asignar dos veces el mismo usuario
        const [userProject, created] = await UserProject.findOrCreate({
            where: {
                usuario_id,
                proyecto_id
            },
            defaults: {
                usuario_id,
                proyecto_id
            }
        });

        if (!created) {
            throw new Error('El usuario ya está asignado a este proyecto');
        }

        return userProject;

    } catch (error) {
        throw new Error(error.message);
    }
};


// Retirar un usuario de un proyecto
exports.removeUserFromProject = async (data) => {
    try {
        const { usuario_id, proyecto_id } = data;

        const userProject = await UserProject.findOne({
            where: {
                usuario_id,
                proyecto_id
            }
        });

        if (!userProject) {
            throw new Error('El usuario no está asignado a este proyecto');
        }

        await userProject.destroy();

        return { mensaje: 'Usuario retirado del proyecto correctamente' };

    } catch (error) {
        throw new Error(error.message);
    }
};


// Actualizar un proyecto
exports.updateProject = async (data) => {
    try {
        const { id, nombre, descripcion, administrador_id } = data;

        const projectFound = await project.findByPk(id);

        if (!projectFound) {
            throw new Error('Proyecto no encontrado');
        }

        // Verificar que el administrador exista
        const admin = await User.findByPk(administrador_id);

        if (!admin) {
            throw new Error('Administrador no encontrado');
        }

        if (admin.rol_id !== ROLES.ADMINISTRADOR) {
            throw new Error('El usuario no tiene permisos de administrador');
        }

        await projectFound.update({
            nombre,
            descripcion,
            administrador_id
        });

        return projectFound;

    } catch (error) {
        throw new Error(error.message);
    }
};


// Eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        const projectFound = await project.findByPk(id);

        if (!projectFound) {
            throw new Error('Proyecto no encontrado');
        }

        await projectFound.destroy();

        return { mensaje: 'Proyecto eliminado correctamente' };

    } catch (error) {
        throw new Error(error.message);
    }
};


// Consultar un proyecto por su ID y verificar que el usuario tenga acceso
exports.getProjectById = async (id, userId) => {
    try {
        const projectFound = await project.findByPk(id);

        if (!projectFound) {
            throw new Error('Proyecto no encontrado');
        }

        // Verificar si el usuario es el administrador del proyecto
        const isAdmin = projectFound.administrador_id === userId;

        // Verificar si el usuario está asignado al proyecto
        const assignedUser = await UserProject.findOne({
            where: {
                usuario_id: userId,
                proyecto_id: id
            }
        });

        if (!isAdmin && !assignedUser) {
            throw new Error('No tienes acceso a este proyecto');
        }

        return projectFound;

    } catch (error) {
        throw new Error(error.message);
    }
};
