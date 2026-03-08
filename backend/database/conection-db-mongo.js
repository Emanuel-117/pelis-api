const mongoose = require('mongoose');
const dns = require('dns');
const getConnection = async () => {

    dns.setServers([
        '8.8.8.8',        // Google Primary
        '8.8.4.4',        // Google Secondary
        '1.1.1.1',        // Cloudflare Primary
        '1.0.0.1',        // Cloudflare Secondary
        '208.67.222.222', // OpenDNS Primary
        '208.67.220.220', // OpenDNS Secondary
    ]);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅Conexión a MongoDB exitosa');
    } catch (e) {
        console.error('Error al conectar con MongoDB:', e);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    getConnection,
}
