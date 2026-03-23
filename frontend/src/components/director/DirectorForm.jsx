import { useState, useEffect } from 'react';

export default function DirectorForm({ initialData, onSubmit, onCancel, saving }) {
    const [form, setForm] = useState({ nombres: '', estado: 'Activo' });

    useEffect(() => {
        if (initialData) setForm({ nombres: initialData.nombres || '', estado: initialData.estado || 'Activo' });
    }, [initialData]);

    const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
            <div className="form-group">
                <label className="form-label">Nombre Completo *</label>
                <input className="form-control-custom" value={form.nombres} onChange={(e) => set('nombres', e.target.value)} required minLength={2} placeholder="Ej: Christopher Nolan..." />
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
