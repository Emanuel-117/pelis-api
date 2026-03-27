const Genre = require('../models/genre.model');

// GET /api/generos  - Listar todos los géneros
const getAllGenres = async (req, res) => {
    try {
        const { estado } = req.query;
        const filter = {};
        if (estado) filter.estado = estado;

        const genres = await Genre.find(filter).sort({ nombre: 1 });
        return res.status(200).json({
            ok: true,
            total: genres.length,
            data: genres,
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener géneros', error: error.message });
    }
};

// GET /api/generos/:id  - Obtener un género por ID
const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ ok: false, message: 'Género no encontrado' });
        }
        return res.status(200).json({ ok: true, data: genre });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener el género', error: error.message });
    }
};

// POST /api/generos  - Crear un género
const createGenre = async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        const genre = new Genre({ nombre, estado, descripcion });
        const saved = await genre.save();
        return res.status(201).json({ ok: true, message: 'Género creado exitosamente', data: saved });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe un género con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al crear el género', error: error.message });
    }
};

// PUT /api/generos/:id  - Actualizar un género
const updateGenre = async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            { nombre, estado, descripcion },
            { returnDocument: 'after', runValidators: true }
        );
        if (!genre) {
            return res.status(404).json({ ok: false, message: 'Género no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Género actualizado exitosamente', data: genre });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe un género con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al actualizar el género', error: error.message });
    }
};

// DELETE /api/generos/:id  - Eliminar un género
const deleteGenre = async (req, res) => {
    try {
        const Media = require('../models/media.model');
        const mediaCount = await Media.countDocuments({ genero: req.params.id });
        if (mediaCount > 0) {
            return res.status(409).json({
                ok: false,
                message: `No se puede eliminar: el género está asociado a ${mediaCount} producción(es)`,
            });
        }
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).json({ ok: false, message: 'Género no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Género eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al eliminar el género', error: error.message });
    }
};

module.exports = { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre };
