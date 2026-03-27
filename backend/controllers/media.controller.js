const Media = require('../models/media.model');
const Genre = require('../models/genre.model');
const Director = require('../models/director.model');
const Productora = require('../models/productora.model');
const Type = require('../models/type.model');

// Validar genero, director, productora y tipo Activos
const validateBusinessRules = async ({ generoId, directorId, productoraId, tipoId }) => {
    const errors = [];
    const [genre, director, productora, type] = await Promise.all([
        Genre.findById(generoId),
        Director.findById(directorId),
        Productora.findById(productoraId),
        Type.findById(tipoId),
    ]);

    if (!genre || genre.estado !== 'Activo') errors.push('El género no existe o está Inactivo');
    if (!director || director.estado !== 'Activo') errors.push('El director no existe o está Inactivo');
    if (!productora || productora.estado !== 'Activo') errors.push('La productora no existe o está Inactiva');
    if (!type) errors.push('El tipo especificado no existe');

    return errors;
};

// Populate reutilizable
const populateMedia = (query) =>
    query
        .populate('genero', 'nombre estado')
        .populate('director', 'nombres estado')
        .populate('productora', 'nombre estado')
        .populate('tipo', 'nombre');

// GET /api/media
const getAllMedia = async (req, res) => {
    try {
        const filter = {};
        if (req.query.tipo) filter.tipo = req.query.tipo;
        if (req.query.genero) filter.genero = req.query.genero;
        if (req.query.anio) filter.anio_estreno = Number(req.query.anio);

        const data = await populateMedia(Media.find(filter).sort({ fecha_creacion: -1 }));
        res.json({ ok: true, total: data.length, data });
    } catch (e) {
        res.status(500).json({ ok: false, message: e.message });
    }
};

// GET /api/media/:id
const getMediaById = async (req, res) => {
    try {
        const media = await populateMedia(Media.findById(req.params.id));
        if (!media) return res.status(404).json({ ok: false, message: 'Producción no encontrada' });
        res.json({ ok: true, data: media });
    } catch (e) {
        res.status(500).json({ ok: false, message: e.message });
    }
};

// GET /api/media/serial/:serial
const getMediaBySerial = async (req, res) => {
    try {
        const media = await populateMedia(Media.findOne({ serial: req.params.serial }));
        if (!media) return res.status(404).json({ ok: false, message: 'Producción no encontrada' });
        res.json({ ok: true, data: media });
    } catch (e) {
        res.status(500).json({ ok: false, message: e.message });
    }
};

// POST /api/media
const createMedia = async (req, res) => {
    try {
        const { titulo, sinopsis, url, imagen_portada, anio_estreno, genero, director, productora, tipo } = req.body;

        const errors = await validateBusinessRules({ generoId: genero, directorId: director, productoraId: productora, tipoId: tipo });
        if (errors.length > 0) return res.status(422).json({ ok: false, errors });

        const saved = await Media.create({ titulo, sinopsis, url, imagen_portada, anio_estreno, genero, director, productora, tipo });
        res.status(201).json({ ok: true, message: 'Producción creada', data: saved });
    } catch (e) {
        if (e.code === 11000) return res.status(409).json({ ok: false, message: 'URL o serial duplicado' });
        if (e.name === 'ValidationError') return res.status(400).json({ ok: false, errors: Object.values(e.errors).map(x => x.message) });
        res.status(500).json({ ok: false, message: e.message });
    }
};

// PUT /api/media/:id
const updateMedia = async (req, res) => {
    try {
        const { titulo, sinopsis, url, imagen_portada, anio_estreno, genero, director, productora, tipo } = req.body;

        const errors = await validateBusinessRules({ generoId: genero, directorId: director, productoraId: productora, tipoId: tipo });
        if (errors.length > 0) return res.status(422).json({ ok: false, errors });

        const media = await populateMedia(
            Media.findByIdAndUpdate(req.params.id, { titulo, sinopsis, url, imagen_portada, anio_estreno, genero, director, productora, tipo }, { new: true, runValidators: true })
        );
        if (!media) return res.status(404).json({ ok: false, message: 'Producción no encontrada' });
        res.json({ ok: true, message: 'Producción actualizada', data: media });
    } catch (e) {
        if (e.code === 11000) return res.status(409).json({ ok: false, message: 'URL duplicado' });
        res.status(500).json({ ok: false, message: e.message });
    }
};

// DELETE /api/media/:id
const deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) return res.status(404).json({ ok: false, message: 'Producción no encontrada' });
        res.json({ ok: true, message: `"${media.titulo}" eliminada` });
    } catch (e) {
        res.status(500).json({ ok: false, message: e.message });
    }
};

module.exports = { getAllMedia, getMediaById, getMediaBySerial, createMedia, updateMedia, deleteMedia };
