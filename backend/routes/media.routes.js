const express = require('express');
const router = express.Router();
const {
    getAllMedia,
    getMediaById,
    getMediaBySerial,
    createMedia,
    updateMedia,
    deleteMedia,
} = require('../controllers/media.controller');

// GET    /api/media                       - Listar todas las producciones (filtros: ?tipo=&genero=&anio=)
router.get('/', getAllMedia);

// GET    /api/media/serial/:serial        - Buscar por serial único UUID
router.get('/serial/:serial', getMediaBySerial);

// GET    /api/media/:id                   - Obtener por ID de MongoDB
router.get('/:id', getMediaById);

// POST   /api/media                       - Crear nueva producción (valida entidades activas)
router.post('/', createMedia);

// PUT    /api/media/:id                   - Actualizar producción (valida entidades activas)
router.put('/:id', updateMedia);

// DELETE /api/media/:id                   - Eliminar producción
router.delete('/:id', deleteMedia);

module.exports = router;
