
const projectService = require('../services/project.service');

// Crear proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;

        const newProject = await projectService.createProject({
            nombre,
            descripcion,
            administrador_id
        });

        res.status(201).json({
            message: 'Proyecto creado con éxito',
            project: newProject
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Consultar todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();

        res.status(200).json({
            message: 'Proyectos consultados con éxito',
            projects
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Consultar proyectos de un usuario
exports.getProjectByuserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const projects = await projectService.getProjectByuserId(userId);

        res.status(200).json({
            message: 'Proyectos consultados con éxito',
            projects
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Asignar usuario a un proyecto
exports.assignUserToProject = async (req, res) => {
    try {
        const { usuario_id, proyecto_id } = req.body;

        const assignment = await projectService.assignUserToProject({
            usuario_id,
            proyecto_id
        });

        res.status(201).json({
            message: 'Usuario asignado al proyecto con éxito',
            assignment
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Retirar usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        const { usuario_id, proyecto_id } = req.body;

        const result = await projectService.removeUserFromProject({
            usuario_id,
            proyecto_id
        });

        res.status(200).json({
            message: 'Usuario retirado del proyecto con éxito',
            result
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Actualizar proyecto
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, administrador_id } = req.body;

        const updatedProject = await projectService.updateProject({
            id,
            nombre,
            descripcion,
            administrador_id
        });

        res.status(200).json({
            message: 'Proyecto actualizado con éxito',
            project: updatedProject
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Eliminar proyecto
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await projectService.deleteProject(id);

        res.status(200).json({
            message: 'Proyecto eliminado con éxito',
            result
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Consultar proyecto por ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const project = await projectService.getProjectById(id, userId);

        res.status(200).json({
            message: 'Proyecto consultado con éxito',
            project
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
