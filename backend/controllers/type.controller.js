const Type = require('../models/Type');

// GET /api/tipos  - Listar todos los tipos
const getAllTypes = async (req, res) => {
    try {
        const types = await Type.find().sort({ nombre: 1 });
        return res.status(200).json({
            ok: true,
            total: types.length,
            data: types,
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener tipos', error: error.message });
    }
};

// GET /api/tipos/:id  - Obtener un tipo por ID
const getTypeById = async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({ ok: false, message: 'Tipo no encontrado' });
        }
        return res.status(200).json({ ok: true, data: type });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener el tipo', error: error.message });
    }
};

// POST /api/tipos  - Crear un tipo
const createType = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const type = new Type({ nombre, descripcion });
        const saved = await type.save();
        return res.status(201).json({ ok: true, message: 'Tipo creado exitosamente', data: saved });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe un tipo con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al crear el tipo', error: error.message });
    }
};

// PUT /api/tipos/:id  - Actualizar un tipo
const updateType = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const type = await Type.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true, runValidators: true }
        );
        if (!type) {
            return res.status(404).json({ ok: false, message: 'Tipo no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Tipo actualizado exitosamente', data: type });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe un tipo con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al actualizar el tipo', error: error.message });
    }
};

// DELETE /api/tipos/:id  - Eliminar un tipo
const deleteType = async (req, res) => {
    try {
        const Media = require('../models/Media');
        const mediaCount = await Media.countDocuments({ tipo: req.params.id });
        if (mediaCount > 0) {
            return res.status(409).json({
                ok: false,
                message: `No se puede eliminar: el tipo está asociado a ${mediaCount} producción(es)`,
            });
        }
        const type = await Type.findByIdAndDelete(req.params.id);
        if (!type) {
            return res.status(404).json({ ok: false, message: 'Tipo no encontrado' });
        }
        return res.status(200).json({ ok: true, message: 'Tipo eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al eliminar el tipo', error: error.message });
    }
};

module.exports = { getAllTypes, getTypeById, createType, updateType, deleteType };
