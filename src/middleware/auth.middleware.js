const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Accesso denegado no se proporciono un token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.user;

        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, no tiene el rol adecuado' });
        }

        next();
    };
}

module.exports = {authenticateToken, checkRole};