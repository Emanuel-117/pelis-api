const Director = require('../models/Director');

// GET /api/directores  - Listar todos los directores
const getAllDirectors = async (req, res) => {
    try {
        const { estado } = req.query;
        const filter = {};
        if (estado) filter.estado = estado;

        const directors = await Director.find(filter).sort({ nombres: 1 });
        return res.status(200).json({
            ok: true,
            total: directors.length,
            data: directors,
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener directores', error: error.message });
    }
};

// GET /api/directores/:id  - Obtener un director por ID
const getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).json({ ok: false, message: 'Director no encontrado' });
        }
        return res.status(200).json({ ok: true, data: director });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener el director', error: error.message });
    }
};

// POST /api/directores  - Crear un director
const createDirector = async (req, res) => {
    try {
        const { nombres, estado } = req.body;
        const director = new Director({ nombres, estado });
        const saved = await director.save();
        return res.status(201).json({ ok: true, message: 'Director creado exitosamente', data: saved });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al crear el director', error: error.message });
    }
};

// PUT /api/directores/:id  - Actualizar un director
const updateDirector = async (req, res) => {
    try {
        const { nombres, estado } = req.body;
        const director = await Director.findByIdAndUpdate(
            req.params.id,
            { nombres, estado },
            { new: true, runValidators: true }
        );
        if (!director) {
            return res.status(404).json({ ok: false, message: 'Director no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Director actualizado exitosamente', data: director });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al actualizar el director', error: error.message });
    }
};

// DELETE /api/directores/:id  - Eliminar un director
const deleteDirector = async (req, res) => {
    try {
        const Media = require('../models/Media');
        const mediaCount = await Media.countDocuments({ director: req.params.id });
        if (mediaCount > 0) {
            return res.status(409).json({
                ok: false,
                message: `No se puede eliminar: el director está asociado a ${mediaCount} producción(es)`,
            });
        }
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) {
            return res.status(404).json({ ok: false, message: 'Director no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Director eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al eliminar el director', error: error.message });
    }
};

module.exports = { getAllDirectors, getDirectorById, createDirector, updateDirector, deleteDirector };
