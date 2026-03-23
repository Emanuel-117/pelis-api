import { useState, useEffect } from 'react';

export default function GeneroForm({ initialData, onSubmit, onCancel, saving }) {
    const [form, setForm] = useState({ nombre: '', estado: 'Activo', descripcion: '' });

    useEffect(() => {
        if (initialData) setForm({ nombre: initialData.nombre || '', estado: initialData.estado || 'Activo', descripcion: initialData.descripcion || '' });
    }, [initialData]);

    const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
            <div className="form-group">
                <label className="form-label">Nombre *</label>
                <input className="form-control-custom" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} required minLength={2} maxLength={100} placeholder="Ej: Acción, Drama, Comedia..." />
            </div>
            <div className="form-group">
                <label className="form-label">Descripción</label>
                <textarea className="form-control-custom" value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} rows={3} maxLength={500} placeholder="Descripción opcional del género..." />
            </div>
            <div className="form-group">
                <label className="form-label">Estado</label>
                <select className="form-control-custom" value={form.estado} onChange={(e) => set('estado', e.target.value)}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn-icon" onClick={onCancel} style={{ padding: '.5rem 1.25rem' }}>Cancelar</button>
                <button type="submit" className="btn-primary-custom" disabled={saving} style={{ minWidth: 110 }}>
                    {saving ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
}
