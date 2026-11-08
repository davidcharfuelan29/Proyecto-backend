const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Rolepermission = require('../models/rolePermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (email, password) => {
    try {
        //verficar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        //consultar los permisos del rol
        const rolePermissions = await Rolepermission.findAll({ 
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });
        const permissions = rolePermissions.map(rp => rp.permiso_id);

        //generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, rol_id: user.rol_id, permissions }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );
        return token;
    } catch (error) {
        throw new Error(error.message|| 'Error al iniciar sesión');
    }
};
