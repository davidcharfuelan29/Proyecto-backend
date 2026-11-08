const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { authenticateToken, checkRole } = require("../middleware/auth.middleware");
const ROLES = require("../utils/constants");

router.post("/project/create", authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.createProject);
router.put("/project/update/:id", authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.updateProject);
router.delete("/project/delete/:id", authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.deleteProject);
router.get("/projects", authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.getAllProjectsByAdministradorId);
router.get("/project/:id", authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.getProjectById);

router.get("/projects/associated", authenticateToken, checkRole([ROLES.USUARIO]), projectController.getAllProjectsByUserId);
router.delete("/project/disassociate/:id", authenticateToken, checkRole([ROLES.USUARIO]), projectController.disassociateProjectFromUser);

module.exports = router;    
    