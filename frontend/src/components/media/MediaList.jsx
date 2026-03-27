import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrud } from '../../hooks/useCrud';
import { useDebounce } from '../../hooks/useDebounce';
import { useApp } from '../../context/AppContext';
import { media } from '../../api/endpoints/media.api';
import SkeletonRow from '../shared/SkeletonRow';
import EmptyState from '../shared/EmptyState';
import ConfirmModal from '../shared/ConfirmModal';
import { BsPencil, BsTrash, BsPlus, BsSearch, BsPlayCircle } from 'react-icons/bs';

export default function MediaList() {
    const { data, loading, error, remove } = useCrud(media);
    const { toast } = useApp();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Filtrado local por título o serial
    const filteredData = useMemo(() => {
        if (!debouncedSearch) return data;
        const lower = debouncedSearch.toLowerCase();
        return data.filter(
            (m) => m.titulo?.toLowerCase().includes(lower) || m.serial?.toLowerCase().includes(lower)
        );
    }, [data, debouncedSearch]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await remove(confirmDelete._id);
            toast.success('Producción eliminada correctamente');
            setConfirmDelete(null);
        } catch (err) {
            toast.error(err.message, 'Error al eliminar');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div className="table-wrapper">
                {/* Toolbar */}
                <div className="table-toolbar">
                    <div className="search-input-wrap">
                        <BsSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por título o serial..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary-custom" onClick={() => navigate('/media/nueva')}>
                        <BsPlus size={18} /> Nueva Producción
                    </button>
                </div>

                {error && <div style={{ padding: '1rem', color: 'var(--color-danger)' }}>⚠ {error}</div>}

                <div style={{ overflowX: 'auto' }}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Título / Serial</th>
                                <th>Clasificación</th>
                                <th>Año</th>
                                <th style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <SkeletonRow rows={6} columns={5} />
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState
                                            icon="🎬"
                                            title={searchTerm ? 'No hay resultados' : 'Sin producciones'}
                                            description={searchTerm ? `No se encontraron coincidencias para "${searchTerm}"` : 'El catálogo de producciones está vacío.'}
                                            action={!searchTerm && <button className="btn-primary-custom" onClick={() => navigate('/media/nueva')}><BsPlus /> Crear primera</button>}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <tr key={item._id}>
                                        <td style={{ width: 90 }}>
                                            <div style={{
                                                width: 60, height: 85, borderRadius: 6, background: 'var(--color-surface-2)',
                                                backgroundImage: `url(${item.imagen_portada})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                                border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,.3)'
                                            }} />
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)', marginBottom: '.2rem' }}>
                                                {item.titulo}
                                            </div>
                                            <div style={{ fontSize: '.75rem', color: 'var(--color-accent)', fontFamily: 'monospace', fontWeight: 600 }}>
                                                {item.serial}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '.15rem' }}>
                                                <span style={{ fontSize: '.8rem', color: 'var(--color-info)' }}>{item.tipo?.nombre}</span>
                                                <span style={{ fontSize: '.85rem' }}>{item.genero?.nombre}</span>
                                                <span style={{ fontSize: '.75rem', color: 'var(--color-text-muted)' }}>Dir: {item.director?.nombres}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                background: 'rgba(255,255,255,.05)', padding: '.2rem .5rem',
                                                borderRadius: 4, fontSize: '.85rem', fontWeight: 600, border: '1px solid rgba(255,255,255,.1)'
                                            }}>
                                                {item.anio_estreno}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                                <a href={item.url} target="_blank" rel="noreferrer" className="btn-icon" title="Ver URL">
                                                    <BsPlayCircle />
                                                </a>
                                                <button className="btn-icon edit" onClick={() => navigate(`/media/editar/${item._id}`)} title="Editar">
                                                    <BsPencil />
                                                </button>
                                                <button className="btn-icon danger" onClick={() => setConfirmDelete(item)} title="Eliminar">
                                                    <BsTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                show={!!confirmDelete}
                title="Eliminar Producción"
                itemName={confirmDelete?.titulo}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
                loading={deleting}
            />
        </>
    );
}
