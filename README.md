# 🎬 CMS Las pelis mas rapidas del oeste — API REST
### Institución Universitaria Digital de Antioquia

Backend de gestión de contenidos (películas y series) con Node.js, Express y MongoDB Atlas.

---

## 📋 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| **Node.js** | v18 o superior | https://nodejs.org |
| **npm** | v9 o superior | viene con Node.js |
| **Git** | cualquiera | https://git-scm.com |
| **Postman** o Thunder Client | - | https://postman.com |

---

## 📁 Estructura del proyecto

```
peliculas_api/
└── backend/
    ├── .env                  
    ├── .gitignore
    ├── package.json
    ├── index.js              
    ├── database/
    │   └── conection-db-mongo.js
    ├── models/
    │   ├── Genre.js
    │   ├── Director.js
    │   ├── Productora.js
    │   ├── Type.js
    │   └── Media.js
    ├── controllers/
    │   ├── genre.controller.js
    │   ├── director.controller.js
    │   ├── productora.controller.js
    │   ├── type.controller.js
    │   └── media.controller.js
    └── routes/
        ├── genre.routes.js
        ├── director.routes.js
        ├── productora.routes.js
        ├── type.routes.js
        └── media.routes.js
```

---

## 🚀 Pasos para ejecutar el proyecto

### Paso 1 — Entrar a la carpeta del backend

```bash
cd backend
```

### Paso 2 — Verificar el archivo `.env`

El archivo `.env` debe existir dentro de `backend/` con este contenido:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<nombre>
```

> ⚠️ **Nunca subas el `.env` a GitHub.** Ya está en el `.gitignore`.
> Si clonaste el proyecto desde cero, pídele el `.env` al responsable del equipo.

### Paso 3 — Instalar dependencias

```bash
npm install
```

Esto descarga todo lo que está en `package.json` (express, mongoose, cors, dotenv, uuid, nodemon).

### Paso 4 — Iniciar el servidor

**Modo desarrollo** (se reinicia automáticamente al guardar cambios):
```bash
npm run dev
```

**Modo producción** (sin hot-reload):
```bash
npm start
```

### Paso 5 — Verificar que funciona ✅

Abre el navegador o Postman y visita:

```
GET http://localhost:4000/
```

Deberías ver:
```json
{
  "ok": true,
  "message": "🎬 API CMS Cuevana - Institución Universitaria Digital de Antioquia",
  "version": "1.0.0",
  "endpoints": {
    "generos":     "/api/generos",
    "directores":  "/api/directores",
    "productoras": "/api/productoras",
    "tipos":       "/api/tipos",
    "media":       "/api/media"
  }
}
```

Y en la terminal debe aparecer:
```
--- 🟢 Servidor corriendo en el puerto 4000 ---
✅ Conexión a MongoDB exitosa
```

---

## 🧪 Orden correcto para probar la API

> Sigue este orden porque `Media` depende de los otros módulos.

### 1️⃣ Crear un Tipo (Serie o Película)

```
POST http://localhost:4000/api/tipos
Content-Type: application/json

{
  "nombre": "Película",
  "descripcion": "Producción cinematográfica de larga duración"
}
```

Guarda el `_id` que te devuelve.

---

### 2️⃣ Crear un Género (estado Activo)

```
POST http://localhost:4000/api/generos
Content-Type: application/json

{
  "nombre": "Acción",
  "estado": "Activo",
  "descripcion": "Películas con acción y aventura"
}
```

Guarda el `_id`.

---

### 3️⃣ Crear un Director (estado Activo)

```
POST http://localhost:4000/api/directores
Content-Type: application/json

{
  "nombres": "Christopher Nolan",
  "estado": "Activo"
}
```

Guarda el `_id`.

---

### 4️⃣ Crear una Productora (estado Activo)

```
POST http://localhost:4000/api/productoras
Content-Type: application/json

{
  "nombre": "Warner Bros Pictures",
  "estado": "Activo",
  "slogan": "Movies are the new reality",
  "descripcion": "Productora fundada en 1923"
}
```

Guarda el `_id`.

---

### 5️⃣ Crear una Media (usa los IDs anteriores)

```
POST http://localhost:4000/api/media
Content-Type: application/json

{
  "titulo": "Interstellar",
  "sinopsis": "Un equipo de exploradores viaja a través de un agujero de gusano...",
  "url": "https://cuevana.udia.edu.co/peliculas/interstellar",
  "imagen_portada": "https://cdn.udia.edu.co/covers/interstellar.jpg",
  "anio_estreno": 2014,
  "genero":     "<_id del género creado>",
  "director":   "<_id del director creado>",
  "productora": "<_id de la productora creada>",
  "tipo":       "<_id del tipo creado>"
}
```

---

## 📡 Tabla de todos los Endpoints

| Módulo | Método | URL | Descripción |
|---|---|---|---|
| **Géneros** | GET | `/api/generos` | Listar todos |
| | GET | `/api/generos?estado=Activo` | Filtrar por estado |
| | GET | `/api/generos/:id` | Obtener por ID |
| | POST | `/api/generos` | Crear |
| | PUT | `/api/generos/:id` | Actualizar |
| | DELETE | `/api/generos/:id` | Eliminar |
| **Directores** | GET | `/api/directores` | Listar todos |
| | GET | `/api/directores?estado=Activo` | Filtrar por estado |
| | GET | `/api/directores/:id` | Obtener por ID |
| | POST | `/api/directores` | Crear |
| | PUT | `/api/directores/:id` | Actualizar |
| | DELETE | `/api/directores/:id` | Eliminar |
| **Productoras** | GET | `/api/productoras` | Listar todas |
| | GET | `/api/productoras?estado=Activo` | Filtrar por estado |
| | GET | `/api/productoras/:id` | Obtener por ID |
| | POST | `/api/productoras` | Crear |
| | PUT | `/api/productoras/:id` | Actualizar |
| | DELETE | `/api/productoras/:id` | Eliminar |
| **Tipos** | GET | `/api/tipos` | Listar todos |
| | GET | `/api/tipos/:id` | Obtener por ID |
| | POST | `/api/tipos` | Crear |
| | PUT | `/api/tipos/:id` | Actualizar |
| | DELETE | `/api/tipos/:id` | Eliminar |
| **Media** | GET | `/api/media` | Listar todas |
| | GET | `/api/media?tipo=ID` | Filtrar por tipo |
| | GET | `/api/media?genero=ID` | Filtrar por género |
| | GET | `/api/media?anio=2024` | Filtrar por año |
| | GET | `/api/media/:id` | Obtener por ID |
| | GET | `/api/media/serial/:serial` | Obtener por serial UUID |
| | POST | `/api/media` | Crear (valida entidades activas) |
| | PUT | `/api/media/:id` | Actualizar (valida entidades activas) |
| | DELETE | `/api/media/:id` | Eliminar |

---

## ⚠️ Regla de negocio importante

Al crear o actualizar una Media, si el Género, Director o Productora están en estado **"Inactivo"**, la API rechazará la operación con código `422`:

```json
{
  "ok": false,
  "message": "No se puede crear la producción: entidades inválidas o inactivas",
  "errors": [
    "El género \"Terror\" está Inactivo y no puede ser asignado a una producción"
  ]
}
```

---

## 🛑 Solución de problemas comunes

| Error | Solución |
|---|---|
| `ECONNREFUSED` o no conecta a MongoDB | Verifica la `MONGODB_URI` en el `.env`. Revisa que tu IP esté en la lista blanca de MongoDB Atlas |
| `Cannot find module 'uuid'` | Ejecuta `npm install` dentro de `backend/` |
| `Port 4000 already in use` | Cambia `PORT=4001` en el `.env` o cierra el proceso que usa el puerto |
| `ValidationError` al crear Media | Revisa que todos los IDs sean válidos y que las entidades estén en estado "Activo" |
| La ruta devuelve 404 | Asegúrate de usar el prefijo `/api/` en todas las rutas |

---

## 👥 Autores

- **Emanuel González** y equipo — Institución Universitaria Digital de Antioquia
