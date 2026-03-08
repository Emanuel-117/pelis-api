const express = require('express');
const router = express.Router();
const { getAllDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } = require('../controllers/director.controller');

// GET    /api/directores           - Listar todos (soporte filtro ?estado=Activo|Inactivo)
router.get('/', getAllDirectors);

// GET    /api/directores/:id       - Obtener por ID
router.get('/:id', getDirectorById);

// POST   /api/directores           - Crear nuevo
router.post('/', createDirector);

// PUT    /api/directores/:id       - Actualizar por ID
router.put('/:id', updateDirector);

// DELETE /api/directores/:id       - Eliminar por ID
router.delete('/:id', deleteDirector);

module.exports = router;
