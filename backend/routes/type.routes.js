const express = require('express');
const router = express.Router();
const { getAllTypes, getTypeById, createType, updateType, deleteType } = require('../controllers/type.controller');

// GET    /api/tipos           - Listar todos
router.get('/', getAllTypes);

// GET    /api/tipos/:id       - Obtener por ID
router.get('/:id', getTypeById);

// POST   /api/tipos           - Crear nuevo
router.post('/', createType);

// PUT    /api/tipos/:id       - Actualizar por ID
router.put('/:id', updateType);

// DELETE /api/tipos/:id       - Eliminar por ID
router.delete('/:id', deleteType);

module.exports = router;
