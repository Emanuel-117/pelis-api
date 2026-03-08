const Productora = require('../models/Productora');

// GET /api/productoras  - Listar todas las productoras
const getAllProductoras = async (req, res) => {
    try {
        const { estado } = req.query;
        const filter = {};
        if (estado) filter.estado = estado;

        const productoras = await Productora.find(filter).sort({ nombre: 1 });
        return res.status(200).json({
            ok: true,
            total: productoras.length,
            data: productoras,
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener productoras', error: error.message });
    }
};

// GET /api/productoras/:id  - Obtener una productora por ID
const getProductoraById = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).json({ ok: false, message: 'Productora no encontrada' });
        }
        return res.status(200).json({ ok: true, data: productora });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al obtener la productora', error: error.message });
    }
};

// POST /api/productoras  - Crear una productora
const createProductora = async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        const productora = new Productora({ nombre, estado, slogan, descripcion });
        const saved = await productora.save();
        return res.status(201).json({ ok: true, message: 'Productora creada exitosamente', data: saved });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe una productora con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al crear la productora', error: error.message });
    }
};

// PUT /api/productoras/:id  - Actualizar una productora
const updateProductora = async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        const productora = await Productora.findByIdAndUpdate(
            req.params.id,
            { nombre, estado, slogan, descripcion },
            { new: true, runValidators: true }
        );
        if (!productora) {
            return res.status(404).json({ ok: false, message: 'Productora no encontrada' });
        }
        return res.status(200).json({ ok: true, message: 'Productora actualizada exitosamente', data: productora });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ ok: false, message: 'Ya existe una productora con ese nombre' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ ok: false, message: 'Error de validación', errors: messages });
        }
        return res.status(500).json({ ok: false, message: 'Error al actualizar la productora', error: error.message });
    }
};

// DELETE /api/productoras/:id  - Eliminar una productora
const deleteProductora = async (req, res) => {
    try {
        const Media = require('../models/Media');
        const mediaCount = await Media.countDocuments({ productora: req.params.id });
        if (mediaCount > 0) {
            return res.status(409).json({
                ok: false,
                message: `No se puede eliminar: la productora está asociada a ${mediaCount} producción(es)`,
            });
        }
        const productora = await Productora.findByIdAndDelete(req.params.id);
        if (!productora) {
            return res.status(404).json({ ok: false, message: 'Productora no encontrada' });
        }
        return res.status(200).json({ ok: true, message: 'Productora eliminada exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al eliminar la productora', error: error.message });
    }
};

module.exports = { getAllProductoras, getProductoraById, createProductora, updateProductora, deleteProductora };
