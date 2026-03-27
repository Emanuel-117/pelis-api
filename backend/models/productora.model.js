const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre de la productora es obligatorio'],
            trim: true,
            unique: true,
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
        slogan: {
            type: String,
            trim: true,
            maxlength: [200, 'El slogan no puede exceder 200 caracteres'],
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
        },
    },
    {
        timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' },
        versionKey: false,
    }
);

module.exports = mongoose.model('Productora', productoraSchema);
