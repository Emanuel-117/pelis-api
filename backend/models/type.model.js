const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del tipo es obligatorio'],
            trim: true,
            unique: true,
            enum: {
                values: ['Serie', 'Película'],
                message: 'El nombre del tipo debe ser "Serie" o "Película"',
            },
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
