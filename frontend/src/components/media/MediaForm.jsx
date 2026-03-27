import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { media } from '../../api/endpoints/media.api';
import { generos } from '../../api/endpoints/generos.api';
import { directores } from '../../api/endpoints/directores.api';
import { productoras } from '../../api/endpoints/productoras.api';
import { tipos } from '../../api/endpoints/tipos.api';
import { BsArrowLeft, BsImageFill, BsInfoCircleFill, BsLink45Deg, BsFilm } from 'react-icons/bs';

const INITIAL_STATE = {
    titulo: '', sinopsis: '', url: '', imagen_portada: '',
    anio_estreno: new Date().getFullYear(),
    genero: '', director: '', productora: '', tipo: ''
};

export default function MediaForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useApp();

    const [form, setForm] = useState(INITIAL_STATE);
    const [saving, setSaving] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(!!id);

    // Opciones para Selects (Filtradas por "Activo")
    const [lists, setLists] = useState({ generos: [], directores: [], productoras: [], tipos: [] });

    useEffect(() => {
        // 1️⃣ Cargar listas dependientes en paralelo
        const fetchLists = async () => {
            try {
                const [gRes, dRes, pRes, tRes] = await Promise.all([
                    generos.getAll(), directores.getAll(), productoras.getAll(), tipos.getAll()
                ]);

                // Regla de Negocio: Solo mostrar entidades ACTIVAS o las que no tengan estado definido (retrocompatibilidad)
                const activos = (arr) => arr.filter((x) => x.estado === 'Activo' || typeof x.estado === 'undefined');

                setLists({
                    generos: activos(gRes.data?.data || []),
                    directores: activos(dRes.data?.data || []),
                    productoras: activos(pRes.data?.data || []),
                    tipos: activos(tRes.data?.data || []) // Los tipos pueden o no tener estado, filtramos por si acaso
                });
            } catch (err) {
                toast.error('Error al cargar catálogos dependientes', 'Fallo de Red');
            }
        };

        fetchLists();

        // 2️⃣ Cargar datos iniciales si es Edición
        if (id) {
            media.getById(id).then((res) => {
                const m = res.data.data;
                // Mapear refs a solo sus IDs para los selects
                setForm({
                    ...m,
                    genero: m.genero?._id || '',
                    director: m.director?._id || '',
                    productora: m.productora?._id || '',
                    tipo: m.tipo?._id || ''
                });
            }).catch((err) => {
                toast.error(err.message, 'No se encontró la película');
                navigate('/media');
            }).finally(() => setLoadingInitial(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (id) {
                await media.update(id, form);
                toast.success(`"${form.titulo}" actualizado correctamente`);
            } else {
                await media.create(form);
                toast.success(`Producción creada exitosamente`);
            }
            navigate('/media');
        } catch (err) {
            // Manejar error 422 de reglas de negocio del backend
            if (err.response?.status === 422 && err.response?.data?.errors) {
                err.response.data.errors.forEach(eMsg => toast.warning(eMsg, 'Regla de negocio no cumplida'));
            } else {
                toast.error(err.message, 'Error al guardar');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loadingInitial) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando datos...</div>;

    return (
        <div className="page-fade form-page">
            <button className="btn-icon" onClick={() => navigate('/media')} style={{ marginBottom: '1.5rem', gap: '.4rem' }}>
                <BsArrowLeft /> Volver al catálogo
            </button>

            <form onSubmit={handleSubmit}>
                {/* Sección 1: Info Básica */}
                <div className="form-section">
                    <div className="form-section-title"><BsFilm className="section-icon" /> Información Principal</div>
                    <div className="form-group">
                        <label className="form-label">Título de la producción *</label>
                        <input className="form-control-custom" value={form.titulo} onChange={(e) => set('titulo', e.target.value)} required maxLength={200} placeholder="Ej: Interstellar..." style={{ fontSize: '1.1rem', fontWeight: 600 }} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Sinopsis *</label>
                        <textarea className="form-control-custom" value={form.sinopsis} onChange={(e) => set('sinopsis', e.target.value)} required rows={4} maxLength={2000} placeholder="Descripción detallada de la trama..." />
                    </div>
                </div>

                {/* Sección 2: Enlaces y Media */}
                <div className="form-section">
                    <div className="form-section-title"><BsLink45Deg className="section-icon" /> Enlaces y Multimedia</div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">URL del Contenido (Video) *</label>
                            <input type="url" className="form-control-custom" value={form.url} onChange={(e) => set('url', e.target.value)} required placeholder="https://..." />
                        </div>
                        <div className="form-group">
                            <label className="form-label">URL de Portada (Imagen) *</label>
                            <input type="url" className="form-control-custom" value={form.imagen_portada} onChange={(e) => set('imagen_portada', e.target.value)} required placeholder="https://..." />
                        </div>
                    </div>
                    {/* Preview de Portada */}
                    {form.imagen_portada && (
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: 80, height: 110, borderRadius: 8, background: '#000', backgroundImage: `url(${form.imagen_portada})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--color-border)' }} />
                            <span style={{ fontSize: '.85rem', color: 'var(--color-text-muted)' }}><BsImageFill /> Vista previa generada por URL</span>
                        </div>
                    )}
                </div>

                {/* Sección 3: Relaciones y Base */}
                <div className="form-section">
                    <div className="form-section-title"><BsInfoCircleFill className="section-icon" /> Clasificación y Ficha Técnica</div>
                    <div className="form-grid-3">
                        <div className="form-group">
                            <label className="form-label">Año Estreno *</label>
                            <input type="number" className="form-control-custom" value={form.anio_estreno} onChange={(e) => set('anio_estreno', parseInt(e.target.value))} required min={1888} max={new Date().getFullYear() + 5} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tipo *</label>
                            <select className="form-control-custom" value={form.tipo} onChange={(e) => set('tipo', e.target.value)} required>
                                <option value="">-- Seleccionar --</option>
                                {lists.tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Género *</label>
                            <select className="form-control-custom" value={form.genero} onChange={(e) => set('genero', e.target.value)} required>
                                <option value="">-- Seleccionar --</option>
                                {lists.generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">Director *</label>
                            <select className="form-control-custom" value={form.director} onChange={(e) => set('director', e.target.value)} required>
                                <option value="">-- Seleccionar --</option>
                                {lists.directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Productora *</label>
                            <select className="form-control-custom" value={form.productora} onChange={(e) => set('productora', e.target.value)} required>
                                <option value="">-- Seleccionar --</option>
                                {lists.productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingBottom: '3rem' }}>
                    <button type="button" className="btn-icon" onClick={() => navigate('/media')} style={{ padding: '.65rem 1.5rem', fontSize: '1rem' }}>Cancelar</button>
                    <button type="submit" className="btn-primary-custom" disabled={saving} style={{ padding: '.65rem 2rem', fontSize: '1rem' }}>
                        {saving ? 'Procesando...' : id ? 'Actualizar Producción' : 'Crear Producción'}
                    </button>
                </div>
            </form>
        </div>
    );
}
