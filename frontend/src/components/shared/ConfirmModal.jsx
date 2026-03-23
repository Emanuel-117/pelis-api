import { BsExclamationTriangleFill } from 'react-icons/bs';

/**
 * Modal de confirmación reutilizable para cualquier operación destructiva.
 * @param {boolean} show - Controla visibilidad
 * @param {string} title - Título del modal
 * @param {string} message - Mensaje de confirmación
 * @param {string} itemName - Nombre del item a eliminar (se muestra en negrita)
 * @param {function} onConfirm - Callback al confirmar
 * @param {function} onCancel - Callback al cancelar
 * @param {boolean} loading - Deshabilita el botón mientras procesa
 */
export default function ConfirmModal({ show, title = 'Confirmar Eliminación', message, itemName, onConfirm, onCancel, loading }) {
    if (!show) return null;
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-box" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
                        <span style={{ color: 'var(--color-danger)', fontSize: '1.2rem' }}>
                            <BsExclamationTriangleFill />
                        </span>
                        <span className="modal-title">{title}</span>
                    </div>
                    <button className="modal-close" onClick={onCancel}>×</button>
                </div>
                <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                    <div style={{
                        width: 64, height: 64,
                        background: 'rgba(239,68,68,.1)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        fontSize: '1.75rem', color: 'var(--color-danger)'
                    }}>
                        <BsExclamationTriangleFill />
                    </div>
                    <p style={{ color: 'var(--color-text)', marginBottom: '.5rem' }}>
                        {message || 'Esta acción no se puede deshacer.'}
                    </p>
                    {itemName && (
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '.9rem' }}>
                            Vas a eliminar: <strong style={{ color: 'var(--color-text)' }}>{itemName}</strong>
                        </p>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="btn-icon" onClick={onCancel} disabled={loading}
                        style={{ padding: '.5rem 1.25rem', fontSize: '.9rem' }}>
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        style={{
                            background: 'var(--color-danger)',
                            border: 'none', color: '#fff',
                            padding: '.5rem 1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600, fontSize: '.9rem',
                            cursor: 'pointer', fontFamily: 'var(--font)',
                            opacity: loading ? .6 : 1,
                            display: 'flex', alignItems: 'center', gap: '.5rem',
                        }}
                    >
                        {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
