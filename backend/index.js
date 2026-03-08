require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./database/conection-db-mongo');

// Importar rutas
const genreRoutes = require('./routes/genre.routes');
const directorRoutes = require('./routes/director.routes');
const productoraRoutes = require('./routes/productora.routes');
const typeRoutes = require('./routes/type.routes');
const mediaRoutes = require('./routes/media.routes');

const app = express();
const port = process.env.PORT || 4000;

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Conexión a la base de datos ───────────────────────────────────────────────
getConnection();

// ── Ruta de estado del servidor ───────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: '🎬 API CMS Las pelis mas rapidas del oeste',
        version: '1.0.0',
        endpoints: {
            generos: '/api/generos',
            directores: '/api/directores',
            productoras: '/api/productoras',
            tipos: '/api/tipos',
            media: '/api/media',
        },
    });
});

// ── Registro de rutas de la API ───────────────────────────────────────────────
app.use('/api/generos', genreRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/productoras', productoraRoutes);
app.use('/api/tipos', typeRoutes);
app.use('/api/media', mediaRoutes);

// ── Manejo de rutas no encontradas ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ ok: false, message: `Ruta ${req.originalUrl} no encontrada` });
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
    console.log(`--- 🎬 API CMS disponible en http://localhost:${port} ---`);
});