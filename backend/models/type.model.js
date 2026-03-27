const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del tipo es obligatorio'],
            trim: true,
            unique: true,
        },
        estado: {
            type: String,
            required: [true, 'El estado es obligatorio'],
            enum: ['Activo', 'Inactivo'],
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

module.exports = mongoose.model('Type', typeSchema);
