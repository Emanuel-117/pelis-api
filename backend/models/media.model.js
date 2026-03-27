const mongoose = require('mongoose');


const mediaSchema = new mongoose.Schema(
    {
        serial: {
            type: String,
            unique: true,
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

// Generador de Serial Automático Dinámico (Depende del Tipo)
mediaSchema.pre('save', async function () {
    if (this.isNew) {
        // 1. Determinar el prefijo leyendo la relación del Tipo en la BD
        const Type = mongoose.model('Type');
        const tipoDoc = await Type.findById(this.tipo);
        let prefijo = 'MED'; // Por defecto (Media)
        
        if (tipoDoc) {
            const nombreTipo = tipoDoc.nombre.toLowerCase();
            if (nombreTipo.includes('pel')) prefijo = 'PELI';
            else if (nombreTipo.includes('serie')) prefijo = 'SERIE';
            else if (nombreTipo.includes('doc')) prefijo = 'DOC';
        }

        // 2. Buscar último registro con EXACTAMENTE ese prefijo
        const regex = new RegExp(`^${prefijo}-`);
        const lastMedia = await this.constructor.findOne({ serial: regex }).sort({ serial: -1 });
        let nextNumber = 1;
        
        // 3. Incrementador
        if (lastMedia && lastMedia.serial) {
            const parts = lastMedia.serial.split('-');
            if (parts.length === 2 && !isNaN(parts[1])) {
                nextNumber = parseInt(parts[1], 10) + 1;
            }
        }
        
        // 4. Asignar padding de 3 ceros (ej. PELI-001, SERIE-015)
        this.serial = `${prefijo}-${nextNumber.toString().padStart(3, '0')}`;
    }
});

module.exports = mongoose.model('Media', mediaSchema);
