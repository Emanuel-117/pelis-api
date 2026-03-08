const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema(
    {
        nombres: {
            type: String,
            required: [true, 'Los nombres del director son obligatorios'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxlength: [150, 'El nombre no puede exceder 150 caracteres'],
        },
        estado: {
            type: String,
            enum: {
                values: ['Activo', 'Inactivo'],
                message: 'El estado debe ser "Activo" o "Inactivo"',
            },
            default: 'Activo',
        },
    },
    {
        timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' },
        versionKey: false,
    }
);

module.exports = mongoose.model('Director', directorSchema);
