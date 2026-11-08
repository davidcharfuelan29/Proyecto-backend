const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {authenticateToken, checkRole} = require('../middleware/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');

//ruta de usuarios 
router.post('/user/create', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), userController.createUser);
router.put('/user/update/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), userController.updateUser);
router.get('/users', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), userController.getAllUsersByAdministradorId);
router.delete('/user/delete/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), userController.deleteUser);
router.get('/user/rol/:rol_id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), userController.getAllUsersByRol);

//MIDDLEWARE DE ERROR
router.use(errorHandler);

module.exports = router;
