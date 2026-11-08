
const userService = require('../services/user.service');

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        const newUser = await userService.createUser(
            nombre, email, password, rol_id, administrador_id
        );

        res.status(201).json({
            message: 'Usuario creado con éxito',
            user: newUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Actualizar usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, rol_id, administrador_id } = req.body;
    const admin_from_token = req.user.id;

    try {
        const user = await userService.updateUser(
            id, nombre, email, password, rol_id,
            administrador_id, admin_from_token
        );

        res.status(200).json({
            message: 'Usuario actualizado con éxito',
            user
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Consultar usuarios de un administrador
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const administrador_id = req.user.id;
        const { email } = req.query;

        const users = await userService.getAllUsersByAdministrador(
            administrador_id, email
        );

        res.status(200).json({
            message: 'Usuarios consultados con éxito',
            users
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Eliminar usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;

    try {
        const result = await userService.deleteUser(id, admin_from_token);

        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            result
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Consultar usuarios por rol
exports.getAllUsersByRol = async (req, res) => {
    try {
        const { rol_id } = req.params;

        const users = await userService.getAllUsersByRol(rol_id);

        res.status(200).json({
            message: 'Usuarios consultados con éxito',
            users
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
