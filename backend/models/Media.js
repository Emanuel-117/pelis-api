const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const mediaSchema = new mongoose.Schema(
    {
        serial: {
            type: String,
            unique: true,
            default: () => uuidv4(),
        },
        titulo: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true,
            minlength: [1, 'El título debe tener al menos 1 carácter'],
            maxlength: [200, 'El título no puede exceder 200 caracteres'],
        },
        sinopsis: {
            type: String,
            required: [true, 'La sinopsis es obligatoria'],
            trim: true,
            maxlength: [2000, 'La sinopsis no puede exceder 2000 caracteres'],
        },
        url: {
            type: String,
            required: [true, 'La URL es obligatoria'],
            unique: true,
            trim: true,
            match: [/^https?:\/\/.+/, 'La URL debe ser válida y comenzar con http:// o https://'],
        },
        imagen_portada: {
            type: String,
            required: [true, 'La imagen de portada es obligatoria'],
            trim: true,
        },
        anio_estreno: {
            type: Number,
            required: [true, 'El año de estreno es obligatorio'],
            min: [1888, 'El año de estreno no puede ser anterior a 1888'],
            max: [new Date().getFullYear() + 5, `El año no puede ser mayor a ${new Date().getFullYear() + 5}`],
        },
        // Relaciones - Referencias a otros documentos
        genero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
            required: [true, 'El género es obligatorio'],
        },
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director',
            required: [true, 'El director es obligatorio'],
        },
        productora: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productora',
            required: [true, 'La productora es obligatoria'],
        },
        tipo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type',
            required: [true, 'El tipo es obligatorio'],
        },
    },
    {
        timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' },
        versionKey: false,
    }
);

module.exports = mongoose.model('Media', mediaSchema);
