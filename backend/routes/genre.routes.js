const express = require('express');
const router = express.Router();
const { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre } = require('../controllers/genre.controller');

// GET    /api/generos           - Listar todos (soporte filtro ?estado=Activo|Inactivo)
router.get('/', getAllGenres);

// GET    /api/generos/:id       - Obtener por ID
router.get('/:id', getGenreById);

// POST   /api/generos           - Crear nuevo
router.post('/', createGenre);

// PUT    /api/generos/:id       - Actualizar por ID
router.put('/:id', updateGenre);

// DELETE /api/generos/:id       - Eliminar por ID
router.delete('/:id', deleteGenre);

module.exports = router;
