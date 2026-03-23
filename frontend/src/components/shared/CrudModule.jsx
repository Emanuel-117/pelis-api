import { useState } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { useApp } from '../../context/AppContext';
import SkeletonRow from '../shared/SkeletonRow';
import StatusBadge from '../shared/StatusBadge';
import EmptyState from '../shared/EmptyState';
import ConfirmModal from '../shared/ConfirmModal';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';

/**
 * Componente genérico que encapsula la lista + modal de Crear/Editar
 * para los módulos simples: Género, Director, Productora, Tipo.
 * 
 * @param {object} apiObj     - Objeto de endpoints { getAll, create, update, remove }
 * @param {string} entityName - Nombre singular de la entidad (ej: "Género")
 * @param {string} nameField  - Campo que representa el nombre/título (ej: "nombre")
 * @param {Function} FormComponent - Componente de formulario a renderizar en el modal
 * @param {string[]} tableColumns - Encabezados de columnas adicionales a mostrar
 */
export default function CrudModule({ apiObj, entityName, nameField = 'nombre', FormComponent, icon }) {
    const { data, loading, error, create, update, remove } = useCrud(apiObj);
    const { toast } = useApp();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);

    const openCreate = () => { setEditing(null); setModalOpen(true); };
    const openEdit = (item) => { setEditing(item); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditing(null); };

    const handleSave = async (formData) => {
        setSaving(true);
        try {
            if (editing) {
                await update(editing._id, formData);
                toast.success(`${entityName} actualizado correctamente`);
            } else {
                await create(formData);
                toast.success(`${entityName} creado correctamente`);
            }
            closeModal();
        } catch (err) {
            toast.error(err.message, `Error al guardar ${entityName}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await remove(confirmDelete._id);
            toast.success(`${entityName} eliminado correctamente`);
            setConfirmDelete(null);
        } catch (err) {
            toast.error(err.message, `Error al eliminar`);
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

    return (
        <>
            <div className="table-wrapper">
                {/* Toolbar */}
                <div className="table-toolbar">
                    <span className="table-toolbar-title">
                        {icon} {entityName}s ({data.length})
                    </span>
                    <button className="btn-primary-custom" onClick={openCreate}>
                        <BsPlus size={18} /> Nuevo {entityName}
                    </button>
                </div>

                {/* Error state */}
                {error && (
                    <div style={{ padding: '1rem 1.25rem', color: 'var(--color-danger)', fontSize: '.9rem' }}>
                        ⚠ {error}
                    </div>
                )}

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                                <th>Última Actualización</th>
                                <th style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <SkeletonRow rows={5} columns={5} />
                            ) : data.length === 0 ? (
                                <tr><td colSpan={5}>
                                    <EmptyState
                                        icon="📭"
                                        title={`Sin ${entityName.toLowerCase()}s`}
                                        description={`Aún no hay ${entityName.toLowerCase()}s registrados.`}
                                        action={<button className="btn-primary-custom" onClick={openCreate}><BsPlus /> Crear primero</button>}
                                    />
                                </td></tr>
                            ) : (
                                data.map((item) => (
                                    <tr key={item._id}>
                                        <td style={{ fontWeight: 500 }}>{item[nameField] || item.nombres}</td>
                                        <td><StatusBadge estado={item.estado} /></td>
                                        <td style={{ color: 'var(--color-text-muted)', fontSize: '.85rem' }}>{formatDate(item.fecha_creacion)}</td>
                                        <td style={{ color: 'var(--color-text-muted)', fontSize: '.85rem' }}>{formatDate(item.fecha_actualizacion)}</td>
                                        <td>
                                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                                <button className="btn-icon edit" onClick={() => openEdit(item)} title="Editar">
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

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">{editing ? `Editar ${entityName}` : `Nuevo ${entityName}`}</span>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <FormComponent
                                initialData={editing}
                                onSubmit={handleSave}
                                onCancel={closeModal}
                                saving={saving}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                show={!!confirmDelete}
                itemName={confirmDelete?.[nameField] ?? confirmDelete?.nombres}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
                loading={deleting}
            />
        </>
    );
}
