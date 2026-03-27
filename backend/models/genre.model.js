const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del género es obligatorio'],
            trim: true,
            unique: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
        },
        estado: {
            type: String,
            enum: {
                values: ['Activo', 'Inactivo'],
                message: 'El estado debe ser "Activo" o "Inactivo"',
            },
            default: 'Activo',
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
        },
    },
    {
        timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' },
        versionKey: false,
    }
);

module.exports = mongoose.model('Genre', genreSchema);
