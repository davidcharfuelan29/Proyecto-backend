
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Crear usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        return userResponse;

    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};


// Actualizar usuario
exports.updateUser = async (id, nombre, email, password, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findOne({
            where: {
                id,
                administrador_id: admin_from_token
            }
        });

        if (!user) {
            throw new Error('Usuario no encontrado o no tienes permisos');
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({
                where: { email }
            });

            if (userExists) {
                throw new Error('El correo ya está registrado');
            }
        }

        const updateData = {};

        if (nombre !== undefined) updateData.nombre = nombre;
        if (email !== undefined) updateData.email = email;
        if (rol_id !== undefined) updateData.rol_id = rol_id;
        if (administrador_id !== undefined) updateData.administrador_id = administrador_id;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);

        const userResponse = user.toJSON();
        delete userResponse.password;

        return userResponse;

    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
};


// Obtener usuarios de un administrador
exports.getAllUsersByAdministrador = async (administrador_id, email) => {
    try {
        const where = {
            administrador_id
        };

        if (email) {
            where.email = email;
        }

        const users = await User.findAll({
            where,
            attributes: { exclude: ['password'] }
        });

        return users;

    } catch (error) {
        throw new Error(`Error al consultar los usuarios: ${error.message}`);
    }
};


// Eliminar usuario
exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findOne({
            where: {
                id,
                administrador_id: admin_from_token
            }
        });

        if (!user) {
            throw new Error('Usuario no encontrado o no tienes permisos');
        }

        await user.destroy();

        return {
            mensaje: 'Usuario eliminado correctamente'
        };

    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
};


// Obtener usuarios por rol
exports.getAllUsersByRol = async (rol_id) => {
    try {
        const users = await User.findAll({
            where: { rol_id },
            attributes: { exclude: ['password'] }
        });

        return users;

    } catch (error) {
        throw new Error(`Error al consultar usuarios : ${error.message}`);
    }
};
