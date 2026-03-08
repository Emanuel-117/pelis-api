const express = require('express');
const router = express.Router();
const { getAllProductoras, getProductoraById, createProductora, updateProductora, deleteProductora } = require('../controllers/productora.controller');

// GET    /api/productoras           - Listar todas (soporte filtro ?estado=Activo|Inactivo)
router.get('/', getAllProductoras);

// GET    /api/productoras/:id       - Obtener por ID
router.get('/:id', getProductoraById);

// POST   /api/productoras           - Crear nueva
router.post('/', createProductora);

// PUT    /api/productoras/:id       - Actualizar por ID
router.put('/:id', updateProductora);

// DELETE /api/productoras/:id       - Eliminar por ID
router.delete('/:id', deleteProductora);

module.exports = router;
